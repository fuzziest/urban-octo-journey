Cypress.config('baseUrl', 'https://pokemonbattle.me');

describe(
  'e2e pokemon',
  () => {
    it('can buy a new avatar', () => {
      // Authorize
      cy.visit('/');
      cy.get('.auth__form input[type="email"]').type(Cypress.env('pokemons_login'));
      cy.get('#password').type(Cypress.env('pokemons_password'));
      cy.get('.auth__form button[type="submit"]').click();

      // go to shop
      cy.contains('Магазин').click();

      // choose available skin at random
      cy.get('.shop__item.available').then((items) => {
        const randomIndex = Math.floor(Math.random() * items.length);
        cy.wrap(items).eq(randomIndex).contains('Купить').click();
      })

      // enter card info
      cy.get('form').within(() => {
        cy.get('input.credit').type('5555555555554444');
        cy.get('input.k_input_date').type('1025');
        cy.get('input.k_input_ccv').type('125');
        cy.get('input.k_input_name').type('GERMAN DOLNIKOV');
        // click desktop or mobile button (whichever is visible)
        cy.get('button[type="submit"]')
          .each((button) => {
            if (Cypress.dom.isVisible(button)) {
              button.click();
              // stop the .each() loop
              return false;
            }
          })
      })

      // enter security code
      cy.get('#cardnumber').type('56456');
      cy.get('button[type="submit"]').click();

      // check success
      cy.contains('Покупка прошла успешно').should('be.visible');
    })
  }
)
