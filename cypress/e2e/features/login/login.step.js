// cypress/e2e/step_definitions/login.steps.js
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I open the login page", () => {
  cy.visit("/"); // Uses baseUrl from config
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
