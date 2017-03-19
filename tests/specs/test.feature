Feature: Running Cucumber with Protractor
  As a user of Protractor
  I should be able to use Cucumber
  to run my E2E tests

  Scenario: Open the main page and validate the title
    Given I go to "testPage"."mainURL"
    Then the title should equal to "Angular2 Seed"
    And I click "testPage"."textError"
