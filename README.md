**# Cypress with Cucumber (BDD) for React Application**

This repository demonstrates how to use **Cypress** with **Cucumber (BDD)** to test both **end-to-end (E2E)** scenarios and **individual component behavior** in a React application. It uses **Create React App** for the front end, and **Cypress with the @badeball/cypress-cucumber-preprocessor (and esbuild)** for writing tests in Gherkin syntax.

---

## **Features**

### **React Application**
A simple React app featuring a **login page**.

### **E2E Testing**
Tests for login functionality using **Cypress and Cucumber**.
- The **E2E tests** are located in the `cypress/e2e/` folder.

### **Component Testing**
Tests for a reusable **Button component** using **Cypress component testing with Cucumber**.
- The **component tests** are located in the `cypress/component/` folder.

---

## **Project Structure**
```bash
my-react-app/
├── cypress/
│   ├── e2e/
│   │   ├── features/
│   │   │   └── login.feature
│   │   └── step_definitions/
│   │       └── login.steps.js
│   ├── component/
│   │   ├── features/
│   │   │   └── button.feature
│   │   └── step_definitions/
│   │       └── button.steps.js
├── public/
├── src/
│   ├── components/
│   │   └── Button.js
│   ├── App.js
│   └── index.js
├── cypress.config.js
├── webpack.config.js
├── package.json
└── README.md
```

---

## **Prerequisites**
- **Node.js** (v14 or later)
- **npm** (comes with Node.js)

---

## **Setup**
### **Clone the repository:**
```bash
git clone https://github.com/yourusername/my-react-app.git
cd my-react-app
```
### **Install dependencies:**
```bash
npm install
```
Ensure Cypress and testing dependencies are installed (these are specified in `devDependencies` in `package.json`).

---

## **Running the Application**
### **Start the React development server:**
```bash
npm start
```
Your app will be available at **http://localhost:3000**.

---

## **Running End-to-End (E2E) Tests**
### **Open the Cypress Test Runner:**
```bash
npx cypress open
```
In the Test Runner, select the `login.feature` file (located under `cypress/e2e/features/`).
- This file defines a login scenario using **Gherkin syntax**.
- Step definitions are in `cypress/e2e/step_definitions/login.steps.js`.

---

## **Running Component Tests**
### **Open the Cypress Component Testing Runner:**
```bash
npx cypress open --component
```
In the Component Testing Runner, select the `button.feature` file (located under `cypress/component/features/`).
- This file tests the **Button component's behavior**, ensuring that:
  - The button toggles its label from **"Login"** to **"Logout"**.
  - Additional **dashboard text is rendered**.
- Step definitions are in `cypress/component/step_definitions/button.steps.js`.

---

## **Configuration Details**

### **Cypress Configuration**
The Cypress configuration is defined in **`cypress.config.js`**:
```javascript
const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.feature",
    baseUrl: "http://localhost:3000",
    chromeWebSecurity: false,
    async setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)]
      });
      on("file:preprocessor", bundler);
      await addCucumberPreprocessorPlugin(on, config);
      return config;
    },
  },
  component: {
    specPattern: "cypress/component/**/*.feature",
    devServer: {
      framework: "react-scripts",
      bundler: "webpack",
      webpackConfig: require("./webpack.config.js")
    },
    async setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)]
      });
      on("file:preprocessor", bundler);
      await addCucumberPreprocessorPlugin(on, config);
      return config;
    }
  },
});
```

---

### **Test Files**

#### **E2E Login Feature (`cypress/e2e/features/login.feature`)**
```gherkin
Feature: Login Functionality

  Background:
    Given I open the login page

  Scenario: Successful login with valid credentials
    When I enter "user@example.com" and "password123"
    And I click the login button
    Then I should see the dashboard
```

#### **Component Button Feature (`cypress/component/features/button.feature`)**
```gherkin
Feature: Button Component Testing

  Scenario: Button toggles on click
    Given the Button component is rendered with label "Login"
    When I click the button
    Then I should see a button rendered with label "Logout"
```

---

## **Troubleshooting**
- **No tests found in feature file:**
  - Ensure your feature files follow proper **Gherkin syntax** and are located in a folder matching your **`specPattern`** in the Cypress config.

- **Webpack loader issues:**
  - If you get errors related to loading **`.feature`** files, confirm that your **webpack.config.js** includes the **raw-loader** rule and that **raw-loader** is installed.

```bash
npm install --save-dev raw-loader
```

---

### 🚀 **Happy Testing!** 🎉

