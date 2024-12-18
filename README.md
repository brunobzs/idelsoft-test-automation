# Test Automation with Cypress and TypeScript

This repository contains a test automation project developed with **Cypress** and **TypeScript**. The goal of this project is to validate the functionalities of an [e-commerce](https://magento.softwaretestingboard.com/), ensuring that the main user journeys work as expected.

## 🛠️ About the Project

This project was created to perform automated tests on an e-commerce, including:

- Authentication (Login and Registration).
- Product Search.
- Product Details Page.

## 🚀 Technologies Used

- [Cypress](https://www.cypress.io/) - Framework for end-to-end testing.
- [TypeScript](https://www.typescriptlang.org/) - JavaScript superset for static typing.

## 📦 Installation and Configuration

Follow the steps below to install and configure the project:

1. **Install as dependencies**:

Make sure [Node.js](https://nodejs.org/) is installed.

```bash
npm install
```

2. **Environment Configuration**:

- If necessary, edit the `cypress.config.ts` file to adjust the URLs and other project-specific settings.

- Create an `.env` file for environment variables, such as credentials or endpoint URLs.

3. **Run the tests**:

- To open the Cypress interface:

```bash
npx cypress open
```

- To run the tests in headless mode:

```bash
npx cypress run
```

## 📁 Project Structure

```
├── cypress
│ ├── e2e                  # Test files
│ ├── fixtures             # Mock data files (e.g. mock JSONs)
│ ├── page-objects         # Interface elements using page objects (POM)
│ ├── support              # Custom support and commands
│ └── screenshots          # Screenshots generated during tests
├── cypress.config.ts      # Cypress configuration
├── package.json           # Dependencies of the project
├── tsconfig.json          #TypeScript Configuration
└── README.md              # Project Documentation
```

## 🧪 How to Add New Tests

1. Create a new file in the `cypress/e2e` folder with the name of the functionality that will be tested (ex: `carrinho.cy.ts`).
2. Use the best practices of Cypress and TypeScript to implement the test.
3. Run the tests to validate that the new file is working correctly.

## 🤝 Contribution

Feel free to contribute to this project! To do so:

1. Fork the repository.
2. Create a new branch for your feature or fix:

```bash
git checkout -b my-feature
```

3. Commit your changes and push them to the repository.

4. Open a Pull Request explaining your changes.

---

If you have any questions or suggestions, feel free to contact me.

# Case Tests

## 1. Authentication (Login and Registration)
### 1.1 Login with valid credentials  
**Precondition:** The user is on the login page.  
**Steps:**  
1. Enter a valid email address.  
2. Enter a valid password.  
3. Click "Log in".

**Expected result:** The user is redirected to the home page/successfully logged in.
   
### 1.2 Login with invalid credentials
**Precondition:** The user is on the login page.  
**Steps:**  
1. Enter an invalid email address or an incorrect password.
2. Click "Log in".

**Expected result:** An error message such as "Invalid credentials" is displayed.
   
### 1.3 Registering a new user
**Precondition:** The user is on the registration page.  
**Steps:**
1. Fill in the registration fields with valid data (name, email, password).
2. Click "Register".
   
**Expected Result:** The account is successfully created and the user is redirected to the welcome page.

## 2. Product Search
### 2.1 Search by valid keyword
**Precondition:** The user is on the home page.  
**Steps:**
1. Enter a product keyword in the search field. 
2. Click the "Search" button.
   
**Expected Result:** A list of relevant products is displayed.
### 2.2 Search with no results
**Precondition:** The user is on the home page.  
**Steps:**  
1. Enter an invalid or non-existent keyword.
2. Click the "Search" button.  

**Expected Result:** A "No results found" message is displayed.
## 3. Product Details Page
### 3.1 View product details
**Precondition:** The user is on a list of products.  
**Steps:**
1. Click on a specific product.
   
**Expected Result:** The product details page is loaded with title, price, images, and description.
### 3.2 Add a product to the cart
**Precondition:** The user is on the product details page.  
**Steps:**
1. Click "Add to Cart".

**Expected result:** The product is successfully added to the cart and a visual feedback is shown (e.g. "Product added" notification).