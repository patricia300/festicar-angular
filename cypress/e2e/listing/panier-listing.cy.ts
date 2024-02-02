import { email, token } from "../../fixtures/oauth-data";

describe('panier listing test', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);

    // faking oauth connexion
    window.localStorage.setItem('token', token);
    window.localStorage.setItem('userEmail', email);
  });

  it('should diplay the panier and should contain at least one article', () => {
    cy.fixture('panier-en-cours').then((panier) => {
      cy.intercept('GET', '**/panier?email=**', panier).as('getPanierEncours');
    });

    cy.visit('http://localhost:4200/panier');
    cy.get('[data-cy="panier-page"]').should('be.visible');

    cy.wait('@getPanierEncours');
    cy.get('[data-cy="panier-page"]').find('[data-cy="article-card"]').first().should('be.visible');
  });

  after(() => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('userEmail');
  });
});
