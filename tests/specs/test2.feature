@Fast

Feature: Running Cucumber with Protractor
  As a user of Protractor
  I should be able to use Cucumber
  to run my e2e tests

  Scenario: Moving to element should trigger its hovered state
    When I go to URL "http://localhost:8001/test1.html"
    And I move to "testPage"."titleTest1"
    Then "testPage"."blockTextTest" text should contain "testPage"."txtTest1"

  Scenario: Moving to element should trigger its hovered state (text style step)
    When I go to URL "http://localhost:8001/test1.html"
    And I move to titleTest1 from testPage page
    Then "testPage"."blockTextTest" text should contain "testPage"."txtTest1"

  Scenario: Moving to element with offset should trigger its hovered state
    When I go to URL "http://localhost:8001/test1.html"
    And I move to "testPage"."titleTest1" with an offset of x: 10px, y: 5px
    Then "testPage"."blockTextTest" text should contain "testPage"."txtTest1"

  Scenario: Moving to element with offset should trigger its hovered state (text style step)
    When I go to URL "http://localhost:8001/test1.html"
    And I move to titleTest1 from testPage page with an offset of x: 10px, y: 5px
    Then "testPage"."blockTextTest" text should contain "testPage"."txtTest1"

  Scenario: Validate element text contains provided text (string)
    When I go to URL "http://localhost:8001/test1.html"
    Then "testPage"."linkTest2Page" text should contain "Test2"

  Scenario: Validate element text contains provided text (string) (text style step)
    When I go to URL "http://localhost:8001/test1.html"
    Then linkTest2Page text from testPage page should contain "Test2"

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

  Scenario: Switch to iframe should change the context to this iframe
    When I go to URL "http://localhost:8001/test-iframe.html"
    And I switch to "iframePage"."iframeTest1Page" non angular frame
    Then "testPage"."linkTest2Page" should be present

  Scenario: Switch to iframe should change the context to this iframe (text style step)
    When I go to URL "http://localhost:8001/test-iframe.html"
    And I switch to iframeTest1Page non angular frame from iframePage page
    Then "testPage"."linkTest2Page" should be present

  Scenario: Switch to default frame should change the context to the main page
    When I go to URL "http://localhost:8001/test-iframe.html"
    And I switch to "iframePage"."iframeTest1Page" non angular frame
    Then "testPage"."linkTest2Page" should be present
    And I switch to default frame
    And "testPage"."linkTest2Page" should not be present

  Scenario: Execute script should change the content on the page
    When I go to URL "http://localhost:8001/test1.html"
    And I execute "document.getElementById('text-test').innerHTML = 'Text to test script execution';"
    Then "testPage"."blockTextTest" text should contain "Text to test script execution"

  Scenario: Open new tab should change the context to the new tab
    When I open new tab
    Then URL should contain "about:blank"
    And I close current tab

  Scenario: Close current tab should change the context to the last tab
    When I go to URL "http://localhost:8001/test1.html"
    And I open new tab
    And I close current tab
    Then the title should be "Test1 Page"

  Scenario: Switch to first tab should change the context to the first tab
    When I go to URL "http://localhost:8001/test1.html"
    And I open new tab
    And I switch to first tab
    Then the title should be "Test1 Page"
    And I switch to last tab
    And I close current tab

  Scenario: Switch to last tab should change the context to the last tab
    When I go to URL "http://localhost:8001/test1.html"
    And I open new tab
    And I go to URL "http://localhost:8001/test2.html"
    And I open new tab
    And I go to URL "http://localhost:8001/test-iframe.html"
    And I switch to first tab
    And the title should be "Test1 Page"
    And I switch to last tab
    Then the title should be "Test Page with iframe"
    And I close current tab
    And I close current tab

  Scenario: Accepting browser alert should get the alert accepted
    When I go to URL "http://localhost:8001/test-alert.html"
    And I click "alertPage"."buttonLaunchAlert"
    And I accept browser alert
    Then "alertPage"."blockAlertStatus" text should be "alertPage"."textAlertAccepted"

  Scenario: Dismissing browser alert should get the alert canceled
    When I go to URL "http://localhost:8001/test-alert.html"
    And I click "alertPage"."buttonLaunchAlert"
    And I dismiss browser alert
    Then "alertPage"."blockAlertStatus" text should be "alertPage"."textAlertCanceled"
