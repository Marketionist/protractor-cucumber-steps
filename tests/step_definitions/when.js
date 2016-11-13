'use strict';
/* global browser, by */
/* eslint new-cap: 0 */  // --> OFF for Given, When, Then

module.exports = function () {

    this.When(/^I go to(?: the website)? "([^"]*)"."([^"]*)"$/, function (page, element, next) {
        var url = browser.params.pageObjects[page][element];

        browser.get(url);
        next();
    });

    this.When(/^I click "([^"]*)"."([^"]*)"$/, function (page, element, next) {
        var locator = browser.params.pageObjects[page][element];
        var elem = element(by.css(locator));

        elem.click();
        next();

        // console.log('++++' + elem.toString() + '++++');

        /**
         * Waits for the element to be present and displayed on the page
         * @param {string/promise} elementSelector
         */
        // function waitUntilReady(elementSelector) {
        //     browser.wait(function () {
        //         return elementSelector.isPresent();
        //     }, browser.params.customTimeout);
        //     browser.wait(function () {
        //         return elementSelector.isDisplayed();
        //     }, browser.params.customTimeout);
        // }

        // waitUntilReady(elem);

        // browser.actions().mouseMove(element(by.css(locator))).perform();

        // elem.isPresent().then(function (isPresent) {
        //     if (isPresent) {
        //         browser.actions().mouseMove(elem).perform();
        //         return elem.click().call(next);
        //     } else {
        //         throw new Error('Element by CSS - not present on the page');
        //     }
        // });
    });

    // this.When(/^I type "([^"]*)"."([^"]*)" in the "([^"]*)"."([^"]*)"$/, function (
    //         page1, element1, page2, element2, next) {
    //     element(by.css(browser.params.pageObjects[page2][element2]))
    //         .sendKeys(browser.params.pageObjects[page1][element1]);
    //     next();
    // });

};
