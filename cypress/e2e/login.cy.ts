import CreateAccountPage from "../page-objects/create-account.page";
import LoginPage from "../page-objects/login.page";

const createAccountPage = CreateAccountPage;
const loginPage = LoginPage;

describe('Authentication Test', () => {
  beforeEach(() => {
    cy.accessWebPage();
    cy.intercept('**/customer/section/load/?sections=messages%2Ccustomer%2Ccompare-products%2Clast-ordered-items%2Ccart%2Cdirectory-data%2Ccaptcha%2Cinstant-purchase%2Cpersistent%2Creview%2Cwishlist%2Crecently_viewed_product%2Crecently_compared_product%2Cproduct_data_storage%2Cpaypal-billing-agreement&force_new_section_timestamp=false&_=**').as('sessionAutentication')
  });

  afterEach(() => {
    cy.clearAllCookies();
    cy.clearAllSessionStorage();
  })

  it('Login with valid credentials', () => {
    const { firstName, lastName, email, password } = loginPage.user;
    const fullName: string = `${firstName} ${lastName}`;
    cy.login({ email, password }) // Fill in the login form and submit it

    // Check the API request
    cy.wait('@sessionAutentication').then((req: any) => {
      const fullNameFromAPI: any = req.response.body.customer.fullname;
      expect(req.state).to.equal('Complete');
      expect(fullNameFromAPI).to.equal(fullName);
    })

    // Check if the user is logged in
    cy.get(loginPage.loginPanel).find('span')
      .should('be.visible')
      .and('contain.text', `Welcome, ${fullName}!`);
  });

  it('Login with invalid credentials', () => {
    // Fill in the login form and submit it
    cy.login({
      email: 'wrongUser@email.com',
      password: 'wrongPassword1'
    })

    // Check if the error message is displayed
    cy.get(loginPage.errorMessage).should('be.visible')
      .and('contain.text', 'The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later');
  })

  it('Registering a new user', () => {
    const { firstName, lastName, email, password } = createAccountPage.newUser; // Generate random user data

    createAccountPage.clickOnCreateAccountButton(); // Click on the "Create an Account" button
    createAccountPage.checkPageTitle({ title: 'Create New Customer Account' });

    // Fill in the registration form
    createAccountPage.fillTheForm({
      firstName,
      lastName,
      email,
      password
    })

    cy.contains('button', 'Create an Account').click();

    // Check the API request
    cy.wait('@sessionAutentication').then((req: any) => {
      const fullName: string = `${firstName} ${lastName}`;
      const fullNameFromAPI: any = req.response.body.customer.fullname;
      expect(req.state).to.equal('Complete');
      expect(fullNameFromAPI).to.equal(fullName);
    })

    cy.get(createAccountPage.successMessage).should('be.visible')
      .and('contain.text', 'Thank you for registering with Main Website Store.');
  })
});