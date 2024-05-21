import * as selectors from '../helpers/selectors.json';
import * as variables from '../helpers/variables.json';

const testLoginForm = ({
  login,
  password,
  expectedMessage,
}) => {
  cy.get(selectors.emailInput).type(login);
  cy.get(selectors.passwordInput).type(password);
  cy.get(selectors.loginButton).click();
  cy.get(selectors.message).should('be.visible').should('have.text', expectedMessage);
}



describe('форма логина и пароля', () => {
  beforeEach(() => {
    cy.visit('/');
  })

  afterEach(() => {
    cy.get(selectors.closeButton).should('be.visible');
  })



  specify('успешный вход', () => {
    testLoginForm({
      login: variables.correctLogin,
      password: variables.correctPassword,
      expectedMessage: variables.authSuccessText,
    })
  })

  specify('проверка логики восстановления пароля', () => {
    cy.get(selectors.fogotPassButton).click();
    cy.get(selectors.restorePassEmailInput).type(variables.incorrectLogin);
    cy.get(selectors.restorePassButton).click();
    cy.get(selectors.message).should('be.visible').should('have.text', variables.restoreCodeSentText);
  })

  specify('не входит с неправильным паролем', () => {
    testLoginForm({
      login: variables.correctLogin,
      password: variables.incorrectPassword,
      expectedMessage: variables.authFailText,
    })
  })

  specify('не входит с неправильным логином', () => {
    testLoginForm({
      login: variables.incorrectLogin,
      password: variables.correctPassword,
      expectedMessage: variables.authFailText,
    })
  })

  specify('проверка валидации (логин без @)', () => {
    testLoginForm({
      login: variables.loginNoAtSymbol,
      password: variables.correctPassword,
      expectedMessage: variables.validationFailText,
    })
  })

  specify('успешный вход (с заглавными в логине)', () => {
    testLoginForm({
      login: variables.loginWithCapitals,
      password: variables.correctPassword,
      expectedMessage: variables.authSuccessText,
    })
  })
})