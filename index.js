'use strict';
/* global browser, expect, element, by, EC */
/* eslint new-cap: 0 */  // --> OFF for Given, When, Then

/*
 * Created by marketionist on 13.11.2016
 */
// #############################################################################

// Use the external Chai As Promised to deal with resolving promises in
// expectations
let chai = require('chai');
let chaiAsPromised = require('chai-as-promised');
let fs = require('fs');
let censor = require('./utils/helpers.js').censor;

chai.use(chaiAsPromised);
let expect = chai.expect;

module.exports = function () {
    /**
     * Waits for the element to be present and displayed on the page
     * @param {string} elementSelector
     */
    function waitForDisplayed(elementSelector) {
        browser.wait(EC.presenceOf(elementSelector), browser.params.customTimeout,
            `${elementSelector} should be visible, but it\'s not`);
    }

    // #### When steps #############################################################

    this.When(/^I go to URL "([^"]*)"$/, function (url, next) {
        browser.get(url);
        next();
    });

    this.When(/^I go to "([^"]*)"."([^"]*)"$/, function (page, elem, next) {
        let url = browser.params.pageObjects[page][elem];

        browser.get(url);
        next();
    });

    this.When(/^I click "([^"]*)"."([^"]*)"$/, function (page, elem, next) {
        let locator = browser.params.pageObjects[page][elem];
        let elmnt;

        if (locator[0] + locator[1] === '//') {
            elmnt = element(by.xpath(locator));
        } else {
            elmnt = element(by.css(locator));
        }

        waitForDisplayed(elmnt);
        elmnt.click();
        next();
    });

    // #### Then steps #############################################################

    this.Then(/the title should equal to "([^"]*)"$/, function (text, next) {
        expect(browser.getTitle()).to.eventually.equal(text).and.notify(next);
    });

    // Take a callback as an additional argument to execute when the step is done
    this.Then(/^the file "([^"]*)" is empty$/, function (fileName, callback) {
        fs.readFile(fileName, 'utf8', function (error, contents) {
            if (error) {
                callback(error);
            } else {
                expect(contents).to.eventually.equal('').and.notify(callback);
            }
        });
    });

};
