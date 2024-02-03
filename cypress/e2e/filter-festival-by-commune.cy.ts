describe('search festival by name', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);

    cy.fixture('festival-listing').then((festivals) => {
      cy.intercept('GET', '**/festivals?numeroPage=**', festivals).as('getFestivals');
    });

    cy.fixture('festival-by-commune').then((festivals) => {
      cy.intercept('GET', '**/festivals/by-commune?communeCodeInsee=**', festivals).as('getFestivalsByCommune');
    });

    cy.visit('http://localhost:4200/festivals');
  });

  it('should list 10 festivals retrieved from database', () => {
    cy.wait('@getFestivals');
    cy.get('[data-cy="festival-page"]').find('[data-cy="festival-card"]').should('have.length', 10);

    const filterOptionSelect = cy.get('[data-cy="filter-option-select"]');
    filterOptionSelect.should('be.visible');
    filterOptionSelect.click();

    // choose commune filter option
    cy.wait(700);
    cy.get('.p-element').contains('Commune').should('be.visible');
    cy.get('.p-element').contains('Commune').click();
    const communeAutocomplete = cy.get('[data-cy="commune-autocomplete"]');
    communeAutocomplete.should('be.visible');

    // search and choose Grenoble
    communeAutocomplete.type('Grenoble');
    cy.wait(700);
    cy.get('ul.p-autocomplete-items').find('li').first().contains('Grenoble 38000');
    cy.get('ul.p-autocomplete-items').find('li').first().click();


    // click on commune filter button
    cy.get('[data-cy="commune-filter-button"]').should('be.visible');
    cy.get('[data-cy="commune-filter-button"]').click();


    cy.wait('@getFestivalsByCommune');
    cy.get('[data-cy="festival-page"]').find('[data-cy="festival-card"]').should('not.be.empty');
    cy.get('[data-cy="festival-page"]').find('[data-cy="festival-card"]').first().contains('Grenoble, 38000');
  });

});
