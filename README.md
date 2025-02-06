This repository demonstrates how to use Cypress with Cucumber (BDD) to test both end-to-end (E2E) scenarios and individual component behavior in a React application. It uses Create React App for the front end, and Cypress with the @badeball/cypress-cucumber-preprocessor (and esbuild) for writing tests in Gherkin syntax.

Features
React Application
A simple React app featuring a login page.

E2E Testing
Tests for login functionality using Cypress and Cucumber. The E2E tests are located in the cypress/e2e/ folder.

Component Testing
Tests for a reusable Button component using Cypress component testing with Cucumber. The component tests are located in the cypress/component/ folder.

Project Structure

my-react-app/
├── cypress/
│   ├── e2e/
│   │   ├── features/
│   │   │   └── login.feature
│   │   └── step_definitions/
│   │       └── login.steps.js
│   └── component/
│       ├── features/
│       │   └── button.feature
│       └── step_definitions/
│           └── button.steps.js
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
Prerequisites
Node.js (v14 or later)
npm (comes with Node.js)
Setup
Clone the repository:


git clone https://github.com/yourusername/my-react-app.git
cd my-react-app
Install dependencies:


npm install
Ensure Cypress and testing dependencies are installed:
(These are specified in devDependencies in package.json.)

Running the Application
Start the React development server:

npm start
Your app will be available at http://localhost:3000.

Running End-to-End (E2E) Tests
Open the Cypress Test Runner:


npx cypress open
In the Test Runner, select the login.feature file (located under cypress/e2e/features/). This file defines a login scenario using Gherkin syntax, and its step definitions are in cypress/e2e/step_definitions/login.steps.js.

Running Component Tests
Open the Cypress Component Testing Runner:


npx cypress open --component
In the Component Testing Runner, select the button.feature file (located under cypress/component/features/). This file tests the Button component's behavior, ensuring that the button toggles its label from "Login" to "Logout" and that additional dashboard text is rendered. Step definitions are in cypress/component/step_definitions/button.steps.js.

Configuration Details
Cypress Configuration
The Cypress configuration is defined in cypress.config.js:


// cypress.config.js
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
      framework: "react-scripts", // Use CRA's dev server
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
Webpack Configuration for Component Tests
Since webpack needs to handle .feature files, the minimal webpack.config.js includes a loader for them:


// webpack.config.js
const path = require('path');

module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.feature$/,
        use: 'raw-loader',
        include: [path.resolve(__dirname)]
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.feature']
  }
};
Make sure you have installed the raw-loader:


npm install --save-dev raw-loader
Test Files
E2E Login Feature (cypress/e2e/features/login.feature)

Feature: Login Functionality

  Background:
    Given I open the login page

  Scenario: Successful login with valid credentials
    When I enter "user@example.com" and "password123"
    And I click the login button
    Then I should see the dashboard
E2E Login Step Definitions (cypress/e2e/step_definitions/login.steps.js)

import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I open the login page", () => {
  cy.visit("/");
});

When("I enter {string} and {string}", (email, password) => {
  cy.get('[data-cy="email-input"]').type(email);
  cy.get('[data-cy="password-input"]').type(password);
});

When("I click the login button", () => {
  cy.get('[data-cy="login-button"]').click();
});

Then("I should see the dashboard", () => {
  cy.get('[data-cy="dashboard-header"]')
    .should("be.visible")
    .and("contain", "Dashboard");
});
Component Button Feature (cypress/component/features/button.feature)

Feature: Button Component Testing

  Scenario: Button toggles on click
    Given the Button component is rendered with label "Login"
    When I click the button
    Then I should see a button rendered with label "Logout"
Component Button Step Definitions (cypress/component/step_definitions/button.steps.js)
If your Button component itself does not handle toggling, you can create a composite component (if desired) or assume your Button component accepts props to toggle its label. For this example, assume your Button component (in src/components/Button.js) has been updated to accept two props: initialLabel and toggledLabel, and toggles its label when clicked.


// src/components/Button.js
import React, { useState } from 'react';

export default function Button({ initialLabel, toggledLabel, ...props }) {
  const [label, setLabel] = useState(initialLabel);
  const handleClick = (e) => {
    setLabel(toggledLabel);
    if (props.onClick) props.onClick(e);
  };

  return (
    <button data-cy="custom-button" onClick={handleClick}>
      {label}
    </button>
  );
}
Then, the step definitions:


// cypress/component/step_definitions/button.steps.js
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { mount } from "@cypress/react";
import Button from "../../../src/components/Button";

Given("the Button component is rendered with label {string}", (initialLabel) => {
  // Mount the Button with toggling behavior.
  // Here, we assume that clicking the button changes its label to "Logout"
  mount(<Button initialLabel={initialLabel} toggledLabel="Logout" />);
});

When("I click the button", () => {
  cy.get('[data-cy="custom-button"]').click();
});

Then("I should see a button rendered with label {string}", (expectedLabel) => {
  cy.get('[data-cy="custom-button"]').should("contain", expectedLabel);
});
Troubleshooting
No tests found in feature file:
Make sure your feature files follow proper Gherkin syntax and are located in a folder matching your specPattern in the config.

Webpack loader issues:
If you get errors related to loading .feature files, confirm that your webpack.config.js includes the raw-loader rule and that raw-loader is installed.