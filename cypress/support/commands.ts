import LoginPage from "../page-objects/login.page";

const loginPage = LoginPage

interface LoginParams {
  email: string;
  password: string;
}

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('accessWebPage', () => {
  const baseURL: string = Cypress.config('baseUrl')
  cy.visit(baseURL);
});

Cypress.Commands.add('login', (params: LoginParams) => {
  const { email, password } = params;

  cy.get(loginPage.loginPanel).should('be.visible').find('a').contains('Sign In').click();
  cy.get(loginPage.emailInput).type(email)
  cy.get(loginPage.passwordInput).type(password)
  cy.get(loginPage.signInButton).contains('Sign In').click()
})
