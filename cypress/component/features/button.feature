    Feature: Button Component Testing

     Background:
        Given I open the login page
     Scenario: Button renders and handles click
        Given the Button component is rendered with label "Login"
        When I click the button
        Then I should see a button rendered with label "Logout"
