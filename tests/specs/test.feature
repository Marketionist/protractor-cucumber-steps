@Fast

Feature: Running Cucumber with Protractor
  As a user of Protractor
  I should be able to use Cucumber
  to run my e2e tests

  Scenario: Go to URL should open corresponding page
    When I go to URL "http://localhost:8001/test1.html"
    Then the title should be "Test1 Page"

  Scenario: Go to page should open corresponding page
    When I go to "testPage"."pageTest1"
    Then the title should be "Test1 Page"

  Scenario: Reload the page should refresh the page
    When I go to "testPage"."pageTest1"
    And I reload the page
    Then "testPage"."linkTest2Page" should be present

  Scenario: Click on Page1 test page link should lead to Page2 test page
    When I go to URL "http://localhost:8001/test1.html"
    And I wait for 200 ms
    And I click "testPage"."linkTest2Page"
    Then the title should be "Test2 Page"

  Scenario: Wait and click on Page1 test page link should lead to Page2 test page
    When I go to "testPage"."pageTest1"
    And I wait and click "testPage"."linkTest2Page"
    Then the title should be "Test2 Page"

  Scenario: Link on Page1 test page should be clicked if it is visible and lead to Page2 test page
    When I go to "testPage"."pageTest1"
    And I wait for 200 ms
    And I click "testPage"."linkTest2Page" if present
    And I wait for 200 ms
    Then the title should be "Test2 Page"

  Scenario: Link on Page1 test page should not be clicked if it is not present
    When I go to "testPage"."pageTest1"
    And I wait for 200 ms
    And I click "testPage"."linkInvisibleTest2Page" if present
    And I wait for 200 ms
    Then the title should be "Test1 Page"

  Scenario: Double click on Page1 test page link should lead to Page2 test page
    When I go to URL "http://localhost:8001/test1.html"
    And I wait for 200 ms
    And I double click "testPage"."linkTest2Page"
    Then the title should be "Test2 Page"

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

  Scenario: Typing "Green" (string) option text inside select dropdown should get this option selected
    When I go to "test2Page"."pageTest2"
    And I type "Green" in the "test2Page"."dropdownColors"
    And I wait and click "test2Page"."dropdownColors"
    Then "test2Page"."blockSelectedColor" text should be "green"

  Scenario: Typing "Gold" (page object) option text inside select dropdown should get this option selected
    When I go to "test2Page"."pageTest2"
    And I type "test2Page"."textGold" in the "test2Page"."dropdownColors"
    And I wait and click "test2Page"."dropdownColors"
    Then "test2Page"."blockSelectedColor" text should be "test2Page"."textGold"

  Scenario: Moving to element should trigger its hovered state
    When I go to URL "http://localhost:8001/test1.html"
    And I move to "testPage"."titleTest1"
    Then "testPage"."blockTextTest" text should contain "testPage"."txtTest1"

  Scenario: Moving to element with offset should trigger its hovered state
    When I go to URL "http://localhost:8001/test1.html"
    And I move to "testPage"."titleTest1" with an offset of x: 10px, y: 5px
    Then "testPage"."blockTextTest" text should contain "testPage"."txtTest1"

  Scenario: Validate element text contains provided text (string)
    When I go to URL "http://localhost:8001/test1.html"
    Then "testPage"."linkTest2Page" text should contain "Test2"

  Scenario: Validate element text contains provided text (page object)
    When I go to URL "http://localhost:8001/test1.html"
    Then "testPage"."linkTest2Page" text should contain "testPage"."txtTest2"

  Scenario: Validate current URL equals provided string
    When I go to URL "http://localhost:8001/test1.html"
    Then URL should be "http://localhost:8001/test1.html"

  Scenario: Validate current URL matches provided regexp
    When I go to URL "http://localhost:8001/test1.html"
    Then URL should match /:80{1,2}[0-9]/test[0-9].htm(l?)/

  Scenario: Validate current URL contains provided string
    When I go to URL "http://localhost:8001/test1.html"
    Then URL should contain "/test1.html"
