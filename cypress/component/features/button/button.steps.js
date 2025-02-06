// cypress/component/step_definitions/button.steps.js
import React, { useState } from 'react';
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import Button from "../../../src/components/Button";
import { mount } from "@cypress/react";

// Create a wrapper component that toggles the button label on click
// const ToggleButton = ({ initialLabel, toggledLabel }) => {
//   const [label, setLabel] = useState(initialLabel);
//   const handleClick = () => setLabel(toggledLabel);
//   return <Button label={label} onClick={handleClick} />;
// };

Given("the Button component is rendered with label {string}", (initialLabel) => {
  // Mount the ToggleButton with the initial label and with "Logout" as the toggled label
    //   mount(<ToggleButton initialLabel={initialLabel} toggledLabel="Logout" />);
  cy.visit("/"); // Uses baseUrl from config
    
});

When("I click the button", () => {
  cy.get('[data-cy="custom-button"]').click();
});

Then("I should see a button rendered with label {string}", (expectedLabel) => {
  cy.get('[data-cy="custom-button"]').should("contain", expectedLabel);
});
