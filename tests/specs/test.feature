@Fast

Feature: Running Cucumber with Protractor
  As a user of Protractor
  I should be able to use Cucumber
  to run my e2e tests

  Scenario: Reload the page should refresh the page
    When I go to "testPage"."pageTest1"
    And I reload the page
    Then "testPage"."linkTest2Page" should be present

  Scenario: Click on Page1 test page link should lead to Page2 test page
    When I go to URL "http://localhost:8001/test1.html"
    And I wait for 200 ms
    And I click "testPage"."linkTest2Page"
    Then the title should equal to "Test2 Page"

  Scenario: Wait and click on Page1 test page link should lead to Page2 test page
    When I go to "testPage"."pageTest1"
    And I wait and click "testPage"."linkTest2Page"
    Then the title should equal to "Test2 Page"

  Scenario: Link on Page1 test page should be clicked if it is visible and lead to Page2 test page
    When I go to "testPage"."pageTest1"
    And I wait for 200 ms
    And I click "testPage"."linkTest2Page" if present
    And I wait for 200 ms
    Then the title should equal to "Test2 Page"

  Scenario: Link on Page1 test page should not be clicked if it is not present
    When I go to "testPage"."pageTest1"
    And I wait for 200 ms
    And I click "testPage"."linkInvisibleTest2Page" if present
    And I wait for 200 ms
    Then the title should equal to "Test1 Page"

  Scenario: Should wait for link to be present on Page1 test page
    When I go to URL "http://localhost:8001/test1.html"
    And I wait for "testPage"."linkTest2Page" to be present

  Scenario: Link on Page1 test page should be present
    When I go to "testPage"."pageTest1"
    And I wait for "testPage"."linkTest2Page" to be present
    Then "testPage"."linkTest2Page" should be present

  Scenario: Link on Page1 test page should not be present
    When I go to "testPage"."pageTest1"
    And I wait for 200 ms
    Then "testPage"."linkInvisibleTest2Page" should not be present

  Scenario: Typing "Green" option text inside select dropdown should get this option selected
    When I go to "test2Page"."pageTest2"
    And I type "Green" in the "test2Page"."dropdownColors"
    And I wait and click "test2Page"."dropdownColors"
    Then "test2Page"."blockSelectedColor" has text "green"

  Scenario: Typing "Gold" (page object) option text inside select dropdown should get this option selected
    When I go to "test2Page"."pageTest2"
    And I type "test2Page"."textGold" in the "test2Page"."dropdownColors"
    And I wait and click "test2Page"."dropdownColors"
    Then "test2Page"."blockSelectedColor" has text "test2Page"."textGold"
