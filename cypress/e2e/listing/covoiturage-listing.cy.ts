import { email, token } from "../../fixtures/oauth-data";

describe('covoiturage listing test', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);

    // faking oauth connexion
    window.localStorage.setItem('token', token);
    window.localStorage.setItem('userEmail', email);
  });

  it('should open the festival page', () => {
    cy.visit('http://localhost:4200/festivals');
    cy.get('[data-cy="festival-page"]').should('be.visible');
  });

  it('should open covoiturage page and display at least one covoiturage', () => {
    cy.fixture('festival-listing').then((festivals) => {
      cy.intercept('GET', '**/festivals?numeroPage=**', festivals).as('getFestivals');
    });

    cy.fixture('covoiturage-listing').then((covoiturages) => {
      cy.intercept('GET', '**/festivals/215', covoiturages).as('getOneFestivalWithItsCovoiturages');
    });

    cy.visit('http://localhost:4200/festivals');
    cy.get('[data-cy="acheter-pass-btn"]').first().should('be.visible');
    cy.get('[data-cy="acheter-pass-btn"]').first().click();

    cy.get('[data-cy="ajout-au-panier-btn"]').should('be.visible');
    cy.get('[data-cy="ajout-au-panier-btn"]').click();

    cy.get('[data-cy="covoiturage-page"]').should('be.visible');

    cy.wait('@getOneFestivalWithItsCovoiturages');
    cy.get('[data-cy="covoiturage-page"]').find('[data-cy="covoiturage-card"]').first().should('be.visible');
  });

  after(() => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('userEmail');
  });
});
