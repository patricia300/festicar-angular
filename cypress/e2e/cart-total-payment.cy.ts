import { email, token } from "../fixtures/oauth-data";

describe('All article Payment test', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);

    // faking oauth connexion
    window.localStorage.setItem('token', token);
    window.localStorage.setItem('userEmail', email);

    cy.fixture('panier-en-cours').then((panier) => {
      cy.intercept('GET', '**/panier?email=**', panier).as('getPanierEncours');
    });

    cy.fixture('cart-total-payment').then((response) => {
      cy.intercept('PUT', '**/panier/payer?id=**', response).as('payerToutLePanier');
    });

    cy.fixture('panier-en-cours').then((panier) => {
      cy.intercept('GET', '**/panier?email=**', panier).as('getPanierEncours');
    });

    cy.visit('http://localhost:4200/panier');
  });

  it('should diplay the "panier" and should contain at least one article', () => {
    cy.get('[data-cy="panier-page"]').should('be.visible');

    cy.wait('@getPanierEncours');
    cy.get('[data-cy="panier-page"]').find('[data-cy="article-card"]').first().should('be.visible');
  });

  it('should pay all articles in the "panier"', () => {
    cy.get('[data-cy="payment-button"]').should('not.be.disabled');
    cy.get('[data-cy="payment-button"]').click();

    // confirm dialog should appear
    cy.get('.ng-trigger[role="alertdialog"]').should('be.visible');
    cy.get('.ng-trigger[role="alertdialog"]').contains('Paiement du panier');

    // to accept the payment
    cy.get('.ng-trigger[role="alertdialog"]').find('p-button[label="Oui"]').should('be.visible');
    cy.get('.ng-trigger[role="alertdialog"]').find('p-button[label="Oui"]').click();

    cy.wait('@payerToutLePanier');
    cy.get('#toast-container').contains('Paiement réussi');

    //IMPORTANT the list of articles in the "panier" is not updated in this test because it's a mocked data

  });

  after(() => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('userEmail');
  });
});
