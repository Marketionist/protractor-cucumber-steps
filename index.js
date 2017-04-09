'use strict';
/* global browser, expect, element, by, EC */
/* eslint no-magic-numbers: 1, new-cap: 0 */  // --> OFF for Given, When, Then

/*
 * Created by marketionist on 13.11.2016
 */
// #############################################################################

// Use the external Chai As Promised to deal with resolving promises in
// expectations
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const fs = require('fs');
const protractor = require('protractor');
const censor = require('./utils/helpers.js').censor;

chai.use(chaiAsPromised);
let expect = chai.expect;
let EC = protractor.ExpectedConditions;
let defaultCustomTimeout = 5000;
let customTimeout = browser.params.customTimeout || defaultCustomTimeout;
let pageObjects = browser.params.pageObjects;

module.exports = function () {
    /**
     * Waits for the element to be present and displayed on the page
     * @param {string} elementSelector
     */
    function waitForDisplayed(elementSelector) {
        browser.wait(EC.presenceOf(elementSelector), customTimeout,
            `${elementSelector} should be visible, but it is not`);
    }

    // #### When steps #############################################################

    this.When(/^I go to URL "([^"]*)"$/, function (url, next) {
        browser.get(url);
        next();
    });

    this.When(/^I go to "([^"]*)"."([^"]*)"$/, function (page, elem, next) {
        let url = pageObjects[page][elem];

        browser.get(url);
        next();
    });

    this.When(/^I click "([^"]*)"."([^"]*)"$/, function (page, elem, next) {
        let locator = pageObjects[page][elem];
        let elmnt;

        if (locator[0] + locator[1] === '//') {
            elmnt = element(by.xpath(locator));
        } else {
            elmnt = element(by.css(locator));
        }

        waitForDisplayed(elmnt);
        browser.wait(EC.elementToBeClickable(elmnt), customTimeout,
            `${elmnt} should be clickable, but it is not`);
        elmnt.click();
        next();
    });

    this.When(/^I wait and click "([^"]*)"."([^"]*)"$/, function (page, elem, next) {
        let locator = pageObjects[page][elem];
        let elmnt;
        let timeToWait = 300;

        if (locator[0] + locator[1] === '//') {
            elmnt = element(by.xpath(locator));
        } else {
            elmnt = element(by.css(locator));
        }

        waitForDisplayed(elmnt);
        browser.wait(EC.elementToBeClickable(elmnt), customTimeout,
            `${elmnt} should be clickable, but it is not`);
        browser.sleep(timeToWait);
        elmnt.click();
        next();
    });

    this.When(/^I wait for (\d+) ms$/, function (timeToWait, next) {
        browser.sleep(timeToWait);
        next();
    });

    this.When(/^I type "([^"]*)"."([^"]*)" in the "([^"]*)"."([^"]*)"$/, function (
            page1, element1, page2, element2, next) {
        let inputField = element(by.css(pageObjects[page2][element2]));

        browser.wait(EC.elementToBeClickable(inputField), customTimeout,
            `${inputField} should be clickable, but it is not`);
        browser.actions().mouseMove(inputField).click().perform();
        inputField.sendKeys(pageObjects[page1][element1]);
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
