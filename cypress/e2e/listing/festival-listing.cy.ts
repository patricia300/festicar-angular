describe('festival listing test', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
  });

  it('should open the festival page', () => {
    cy.visit('http://localhost:4200/festivals');
    cy.get('[data-cy="festival-page"]').should('be.visible');
  });

  it('should display the festival filter section', () => {
    cy.visit('http://localhost:4200/festivals');
    cy.get('[data-cy="festival-filter-section"]').contains('Recherche de festival');
  });

  it('should list 10 festivals retrieved from database', () => {
    cy.fixture('festival-listing').then((festivals) => {
      cy.intercept('GET', '**/festivals?numeroPage=**', festivals).as('getFestivals');
    });

    cy.visit('http://localhost:4200/festivals');

    cy.wait('@getFestivals');
    cy.get('[data-cy="festival-page"]').find('[data-cy="festival-card"]').should('have.length', 10);
  });


})
