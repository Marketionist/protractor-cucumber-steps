'use strict';
/* global browser, element, by */
/* eslint new-cap: 0 */  // --> OFF for Given, When, Then

module.exports = function () {

    /**
     * Waits for the element to be present and displayed on the page
     * @param {string/promise} elementSelector
     */
    function waitForDisplayed(elementSelector) {
        console.log(elementSelector);
        elementSelector.isPresent().then(function (isPresent) {
            if (isPresent) {
                browser.wait(function () {
                    return elementSelector.isDisplayed();
                }, browser.params.customTimeout);
                return browser.actions().mouseMove(elementSelector).perform();
            } else {
                throw new Error('Element is not present on the page');
            }
        });
    }

    this.When(/^I go to(?: the website)? "([^"]*)"."([^"]*)"$/, function (page, elem, next) {
        var url = browser.params.pageObjects[page][elem];

        browser.get(url);
        next();
    });

    this.When(/^I click "([^"]*)"."([^"]*)"$/, function (page, elem, next) {
        var locator = browser.params.pageObjects[page][elem];
        var elmnt;

        if (locator[0] + locator[1] === '//') {
            elmnt = element(by.xpath(locator));
        } else {
            elmnt = element(by.css(locator));
        }

        waitForDisplayed(elmnt);
        elmnt.click();
        next();
    });

    // this.When(/^I type "([^"]*)"."([^"]*)" in the "([^"]*)"."([^"]*)"$/, function (
    //         page1, element1, page2, element2, next) {
    //     element(by.css(browser.params.pageObjects[page2][element2]))
    //         .sendKeys(browser.params.pageObjects[page1][element1]);
    //     next();
    // });

};
