describe('search festival by name', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
  });

  it('should list 10 festivals retrieved from database', () => {
    cy.fixture('festival-listing').then((festivals) => {
      cy.intercept('GET', '**/festivals?numeroPage=**', festivals).as('getFestivals');
    });

    cy.fixture('festival-by-name').then((festivals) => {
      cy.intercept('GET', '**festivals/by-nom?nom=**', festivals).as('getFestivalsByName');
    });

    cy.visit('http://localhost:4200/festivals');


    cy.wait('@getFestivals');
    cy.get('[data-cy="festival-page"]').find('[data-cy="festival-card"]').should('have.length', 10);

    cy.get('[data-cy="festival-search-input"]').should('be.visible');
    cy.get('[data-cy="festival-search-input"]').type('fontaine du rire');
    cy.get('[data-cy="festival-search-button"]').click();

    cy.wait('@getFestivalsByName');
    cy.get('[data-cy="festival-page"]').find('[data-cy="festival-card"]').should('not.be.empty');
    cy.get('[data-cy="festival-page"]').find('[data-cy="festival-card"]').first().contains('FONTAINE DU RIRE');
  });

});
