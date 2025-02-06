Feature: Login Functionality

  Background:
    Given I open the login page

  Scenario: Successful login with valid credentials
    When I enter "user@example.com" and "password123"
    And I click the login button
    Then I should see the dashboard
