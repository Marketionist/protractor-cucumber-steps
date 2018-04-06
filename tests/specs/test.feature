@Fast

Feature: Running Cucumber with Protractor
  As a user of Protractor
  I should be able to use Cucumber
  to run my e2e tests

  Scenario: Go to URL should open corresponding page
    When I go to URL "http://localhost:8001/test1.html"
    Then the title should be "Test1 Page"

  Scenario: Go to URL should open corresponding page (text style step)
    When I go to pageTest1 from testPage page
    Then the title should be "Test1 Page"

  Scenario: Go to page should open corresponding page
    When I go to "testPage"."pageTest1"
    Then the title should be "Test1 Page"

  Scenario: Reload the page should refresh the page
    When I go to "testPage"."pageTest1"
    And I reload the page
    Then "testPage"."linkTest2Page" should be present

  Scenario: Reload the page should refresh the page (text style step)
    When I go to "testPage"."pageTest1"
    And I reload the page
    Then linkTest2Page from testPage page should be present

  Scenario: Click on Page1 test page link should lead to Page2 test page
    When I go to URL "http://localhost:8001/test1.html"
    And I wait for 200 ms
    And I click "testPage"."linkTest2Page"
    Then the title should be "Test2 Page"

  Scenario: Click on Page1 test page link should lead to Page2 test page (text style step)
    When I go to URL "http://localhost:8001/test1.html"
    And I wait for 200 ms
    And I click linkTest2Page from testPage page
    Then the title should be "Test2 Page"

  Scenario: Wait and click on Page1 test page link should lead to Page2 test page
    When I go to "testPage"."pageTest1"
    And I wait and click "testPage"."linkTest2Page"
    Then the title should be "Test2 Page"

  Scenario: Wait and click on Page1 test page link should lead to Page2 test page (text style step)
    When I go to "testPage"."pageTest1"
    And I wait and click linkTest2Page from testPage page
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

  Scenario: Link on Page1 test page should be clicked if it is visible and lead to Page2 test page (text style step)
    When I go to pageTest1 from testPage page
    And I wait for 200 ms
    And I click linkTest2Page from testPage page if present
    And I wait for 200 ms
    Then the title should be "Test2 Page"

  Scenario: Link on Page1 test page should not be clicked if it is not present (text style step)
    When I go to pageTest1 from testPage page
    And I wait for 200 ms
    And I click linkInvisibleTest2Page from testPage page if present
    And I wait for 200 ms
    Then the title should be "Test1 Page"

  Scenario: Double click on Page1 test page link should lead to Page2 test page
    When I go to URL "http://localhost:8001/test1.html"
    And I wait for 200 ms
    And I double click "testPage"."linkTest2Page"
    Then the title should be "Test2 Page"

  Scenario: Double click on Page1 test page link should lead to Page2 test page (text style step)
    When I go to URL "http://localhost:8001/test1.html"
    And I wait for 200 ms
    And I double click linkTest2Page from testPage page
    Then the title should be "Test2 Page"

  Scenario: Should wait for link to be present on Page1 test page
    When I go to URL "http://localhost:8001/test1.html"
    And I wait for "testPage"."linkTest2Page" to be present

  Scenario: Should wait for link to be present on Page1 test page (text style step)
    When I go to URL "http://localhost:8001/test1.html"
    And I wait for linkTest2Page from testPage page to be present

  Scenario: Link on Page1 test page should be present
    When I go to "testPage"."pageTest1"
    And I wait for "testPage"."linkTest2Page" to be present
    Then "testPage"."linkTest2Page" should be present

  Scenario: Link on Page1 test page should not be present
    When I go to "testPage"."pageTest1"
    And I wait for 200 ms
    Then "testPage"."linkInvisibleTest2Page" should not be present

  Scenario: Link on Page1 test page should not be present (text style step)
    When I go to "testPage"."pageTest1"
    And I wait for 200 ms
    Then linkInvisibleTest2Page from testPage page should not be present

  Scenario: Typing "Green" (string) option text inside select dropdown should get this option selected
    When I go to "test2Page"."pageTest2"
    And I type "Green" in "test2Page"."dropdownColors"
    And I wait and click "test2Page"."dropdownColors"
    Then "test2Page"."blockSelectedColor" text should be "green"

  Scenario: Typing "Green" (string) option text inside select dropdown should get this option selected (text style step)
    When I go to "test2Page"."pageTest2"
    And I type "Green" in dropdownColors from test2Page page
    And I wait and click "test2Page"."dropdownColors"
    Then blockSelectedColor text from test2Page page should be "green"

  Scenario: Typing "Gold" (page object) option text inside select dropdown should get this option selected
    When I go to "test2Page"."pageTest2"
    And I type "test2Page"."textGold" in "test2Page"."dropdownColors"
    And I wait and click "test2Page"."dropdownColors"
    Then "test2Page"."blockSelectedColor" text should be "test2Page"."textGold"

  Scenario: Typing "Gold" (page object) option text inside select dropdown should get this option selected (text style step)
    When I go to "test2Page"."pageTest2"
    And I type textGold from test2Page page in dropdownColors from test2Page page
    And I wait and click "test2Page"."dropdownColors"
    Then blockSelectedColor text from test2Page page should be textGold from test2Page page
