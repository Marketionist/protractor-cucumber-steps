'use strict';
/* global browser, expect, element, by, EC */
/* eslint new-cap: 0 */ // --> OFF for Given, When, Then

/*
 * Created by marketionist on 13.11.2016
 */
// #############################################################################

const { defineSupportCode } = require('cucumber');
// Use the external Chai As Promised to deal with resolving promises in
// expectations
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const fs = require('fs');
const protractor = require('protractor');
const censor = require('./utils/helpers.js').censor;
const errors = require('./utils/errors.js');

chai.use(chaiAsPromised);
const expect = chai.expect;
const EC = protractor.ExpectedConditions;
const defaultCustomTimeout = 5000;
const customTimeout = browser.params.customTimeout || defaultCustomTimeout;
const pageObjects = browser.params.pageObjects;
const timeToWaitMax = 300100; // Maximum time to wait for in 'I wait for (\d+) ms' step

/**
 * Waits for the element to be present and displayed on the page
 * @param {string} elementSelector
 */
function waitForDisplayed(elementSelector) {
    browser.wait(EC.presenceOf(elementSelector), customTimeout,
        errors.ELEMENT_PRESENT);
}
/**
 * Composes proper element locator for further actions
 * @param {string} page
 * @param {string} elem
 * @returns {Object} elmnt
 */
function composeLocator(page, elem) {
    const locator = pageObjects[page][elem];
    let elmnt;

    if (locator[0] + locator[1] === '//') {
        elmnt = element(by.xpath(locator));
    } else {
        elmnt = element(by.css(locator));
    }

    return elmnt;
}
/**
 * Composes proper WebdriverJS element locator (inherited from webdriver.By to work without Angular) for further actions
 * @param {string} page
 * @param {string} elem
 * @returns {Object} elmnt
 */
function composeLocatorWebdriver(page, elem) {
    const locator = pageObjects[page][elem];
    let elmnt;

    if (locator[0] + locator[1] === '//') {
        elmnt = browser.driver.findElement(by.xpath(locator));
    } else {
        elmnt = browser.driver.findElement(by.css(locator));
    }

    return elmnt;
}
/**
 * Navigates to URL provided in page object
 * @param {string} page
 * @param {string} elem
 * @returns {Promise} promise
 */
function goTo(page, elem) {
    const url = pageObjects[page][elem];

    return browser.get(url);
}
/**
 * Clicks on element provided in page object
 * @param {string} page
 * @param {string} elem
 * @returns {Promise} promise
 */
function clickOn(page, elem) {
    const elmnt = composeLocator(page, elem);

    waitForDisplayed(elmnt);
    browser.wait(EC.elementToBeClickable(elmnt), customTimeout,
        `"${pageObjects[page][elem]}" ${errors.CLICKABLE}`);

    return elmnt.click();
}
/**
 * Waits for 300 ms and then licks on element provided in page object
 * @param {string} page
 * @param {string} elem
 * @param {function} callback
 */
function waitAndClickOn(page, elem, callback) {
    const elmnt = composeLocator(page, elem);
    const timeToWait = 300;

    waitForDisplayed(elmnt);
    browser.wait(EC.elementToBeClickable(elmnt), customTimeout,
        `"${pageObjects[page][elem]}" ${errors.CLICKABLE}`);
    setTimeout(function () {
        elmnt.click().then(function () {
            callback();
        });
    }, timeToWait);
}
/**
 * Clicks on element provided in page object only if it is present on the page
 * @param {string} page
 * @param {string} elem
 * @returns {Promise} promise
 */
function clickIfPresent(page, elem) {
    const elmnt = composeLocator(page, elem);

    return elmnt.isPresent().then(function (isPresent) {
        if (isPresent) {
            // Click only if element is present
            return elmnt.click();
        }
    })
}
/**
 * Double clicks on element provided in page object only if it is present on the page
 * @param {string} page
 * @param {string} elem
 * @returns {Promise} promise
 */
function doubleClickOn(page, elem) {
    const elmnt = composeLocator(page, elem);

    waitForDisplayed(elmnt);
    browser.wait(EC.elementToBeClickable(elmnt), customTimeout,
        `"${pageObjects[page][elem]}" ${errors.CLICKABLE}`);

    return browser.actions().mouseMove(elmnt).doubleClick().perform();
}
/**
 * Wait for element provided in page object to be present on the page
 * @param {string} page
 * @param {string} elem
 * @param {function} callback
 */
function waitForPresent(page, elem, callback) {
    const elmnt = composeLocator(page, elem);

    waitForDisplayed(elmnt);
    elmnt.isPresent().then(function (isPresent) {
        if (isPresent) {
            callback();
        } else {
            throw new Error(errors.ELEMENT_PRESENT);
        }
    });
}
/**
 * Type any text (provided in "" as a string) in the input field provided in page object
 * @param {string} text
 * @param {string} page
 * @param {string} elem
 * @returns {Promise} promise
 */
function typeIn(text, page, elem) {
    const inputField = composeLocator(page, elem);

    waitForDisplayed(inputField);
    browser.wait(EC.elementToBeClickable(inputField), customTimeout,
        `"${pageObjects[page][elem]}" ${errors.CLICKABLE}`);
    browser.actions().mouseMove(inputField).click().perform();

    return inputField.sendKeys(text);
}
/**
 * Type any text provided in page object in the input field provided in page object
 * @param {string} page1
 * @param {string} element1
 * @param {string} page2
 * @param {string} element2
 * @returns {Promise} promise
 */
function typePageObjectIn(page1, element1, page2, element2) {
    const inputField = composeLocator(page2, element2);

    waitForDisplayed(inputField);
    browser.wait(EC.elementToBeClickable(inputField), customTimeout,
        `"${pageObjects[page2][element2]}" ${errors.CLICKABLE}`);
    browser.actions().mouseMove(inputField).click().perform();

    return inputField.sendKeys(pageObjects[page1][element1]);
}
/**
 * Move the mouse pointer over any element provided in page object
 * @param {string} page
 * @param {string} elem
 * @returns {Promise} promise
 */
function moveTo(page, elem) {
    const elmnt = composeLocator(page, elem);

    waitForDisplayed(elmnt);

    return browser.actions().mouseMove(elmnt).perform();
}
/**
 * Move the mouse pointer over any element (provided in page object) with an offset of x: ...px, y: ...px
 * @param {string} page
 * @param {string} elem
 * @param {number} offsetX
 * @param {number} offsetY
 * @returns {Promise} promise
 */
function moveWithOffsetTo(page, elem, offsetX, offsetY) {
    const elmnt = composeLocator(page, elem);
    const integerX = parseInt(offsetX, 10) || 0;
    const integerY = parseInt(offsetY, 10) || 0;

    waitForDisplayed(elmnt);

    return browser.actions().mouseMove(elmnt).mouseMove({ x: integerX, y: integerY }).perform();
}
/**
 * Switch the context to iframe provided in page object
 * @param {string} page
 * @param {string} elem
 * @returns {Promise} promise
 */
function switchToFrame(page, elem) {
    const elmnt = composeLocator(page, elem);

    waitForDisplayed(elmnt);

    return browser.switchTo().frame(elmnt);
}
/**
 * Switch the context to non angular iframe provided in page object
 * @param {string} page
 * @param {string} elem
 * @returns {Promise} promise
 */
function switchToNonAngularFrame(page, elem) {
    const elmntWebdriver = composeLocatorWebdriver(page, elem);

    return browser.driver.switchTo().frame(elmntWebdriver);
}
/**
 * Verify that element provided in page object is present on the page
 * @param {string} page
 * @param {string} elem
 * @returns {Promise} promise
 */
function verifyPresent(page, elem) {
    const elmnt = composeLocator(page, elem);

    return expect(elmnt.isPresent()).to.eventually.equal(true);
}
/**
 * Verify that element provided in page object is not present on the page
 * @param {string} page
 * @param {string} elem
 * @returns {Promise} promise
 */
function verifyNotPresent(page, elem) {
    const elmnt = composeLocator(page, elem);

    return expect(elmnt.isPresent()).to.eventually.equal(false);
}
/**
 * Verify that text of the element provided in page object equals to the text (provided in "" as a string)
 * @param {string} page
 * @param {string} elem
 * @param {string} text
 * @returns {Promise} promise
 */
function verifyText(page, elem, text) {
    const elmnt = composeLocator(page, elem);

    return expect(elmnt.getText()).to.eventually.equal(text);
}
/**
 * Verify that text of the element provided in page object equals to the text provided in page object
 * @param {string} page1
 * @param {string} element1
 * @param {string} page2
 * @param {string} element2
 * @returns {Promise} promise
 */
function verifyPageObjectText(page1, element1, page2, element2) {
    const elmnt = composeLocator(page1, element1);
    const text = pageObjects[page2][element2];

    return expect(elmnt.getText()).to.eventually.equal(text);
}
/**
 * Verify that text of the element provided in page object contains the text provided in page object
 * @param {string} page
 * @param {string} elem
 * @param {string} textPart
 * @param {function} callback
 */
function verifyTextContains(page, elem, textPart, callback) {
    const elmnt = composeLocator(page, elem);

    elmnt.getText().then(function (text) {
        if (text.indexOf(textPart) === -1) {
            throw new Error(`"${text}" ${errors.CONTAIN} "${textPart}"`);
        } else {
            callback();
        }
    });
}

defineSupportCode(function ({ Given, When, Then }) {

    // #### When steps #########################################################

    When(/^I go to URL "([^"]*)"$/, function (url, callback) {
        browser.get(url).then(function () {
            callback();
        });
    });

    When(/^I go to "([a-zA-Z0-9_]+)"."([a-zA-Z0-9_]+)"$/, function (page, elem, callback) {
        goTo(page, elem).then(function () {
            callback();
        });
    });

    When(/^I go to ([a-zA-Z0-9_]+) from ([a-zA-Z0-9_]+) page$/, function (elem, page, callback) {
        goTo(page, elem).then(function () {
            callback();
        });
    });

    When(/^I reload the page$/, function (callback) {
        browser.refresh().then(function () {
            callback();
        });
    });

    When(/^I click "([a-zA-Z0-9_]+)"."([a-zA-Z0-9_]+)"$/, function (page, elem, callback) {
        clickOn(page, elem).then(function () {
            callback();
        });
    });

    When(/^I click ([a-zA-Z0-9_]+) from ([a-zA-Z0-9_]+) page$/, function (elem, page, callback) {
        clickOn(page, elem).then(function () {
            callback();
        });
    });

    When(/^I wait and click "([a-zA-Z0-9_]+)"."([a-zA-Z0-9_]+)"$/, function (page, elem, callback) {
        waitAndClickOn(page, elem, callback);
    });

    When(/^I wait and click ([a-zA-Z0-9_]+) from ([a-zA-Z0-9_]+) page$/, function (elem, page, callback) {
        waitAndClickOn(page, elem, callback);
    });

    When(/^I click "([a-zA-Z0-9_]+)"."([a-zA-Z0-9_]+)" if present$/, function (page, elem, callback) {
        clickIfPresent(page, elem).then(function () {
            callback();
        });
    });

    When(/^I click ([a-zA-Z0-9_]+) from ([a-zA-Z0-9_]+) page if present$/, function (elem, page, callback) {
        clickIfPresent(page, elem).then(function () {
            callback();
        });
    });

    When(/^I double click "([a-zA-Z0-9_]+)"."([a-zA-Z0-9_]+)"$/, function (page, elem, callback) {
        doubleClickOn(page, elem).then(function () {
            callback();
        });
    });

    When(/^I double click ([a-zA-Z0-9_]+) from ([a-zA-Z0-9_]+) page$/, function (elem, page, callback) {
        doubleClickOn(page, elem).then(function () {
            callback();
        });
    });

    When(/^I wait for (\d+) ms$/, { timeout: timeToWaitMax }, function (timeToWait, callback) {
        setTimeout(callback, timeToWait);
    });

    When(/^I wait for "([a-zA-Z0-9_]+)"."([a-zA-Z0-9_]+)" to be present$/, function (page, elem, callback) {
        waitForPresent(page, elem, callback);
    });

    When(/^I wait for ([a-zA-Z0-9_]+) from ([a-zA-Z0-9_]+) page to be present$/, function (elem, page, callback) {
        waitForPresent(page, elem, callback);
    });

    When(/^I type "([^"]*)" in "([a-zA-Z0-9_]+)"."([a-zA-Z0-9_]+)"$/, function (
            text, page, elem, callback) {
        typeIn(text, page, elem).then(function () {
            callback();
        });
    });

    When(/^I type "([^"]*)" in ([a-zA-Z0-9_]+) from ([a-zA-Z0-9_]+) page$/, function (
            text, elem, page, callback) {
        typeIn(text, page, elem).then(function () {
            callback();
        });
    });

    When(/^I type "([a-zA-Z0-9_]+)"."([a-zA-Z0-9_]+)" in "([a-zA-Z0-9_]+)"."([a-zA-Z0-9_]+)"$/, function (
            page1, element1, page2, element2, callback) {
        typePageObjectIn(page1, element1, page2, element2).then(function () {
            callback();
        });
    });

    When(/^I type ([a-zA-Z0-9_]+) from ([a-zA-Z0-9_]+) page in ([a-zA-Z0-9_]+) from ([a-zA-Z0-9_]+) page$/, function (
            element1, page1, element2, page2, callback) {
        typePageObjectIn(page1, element1, page2, element2).then(function () {
            callback();
        });
    });

    When(/^I move to "([a-zA-Z0-9_]+)"."([a-zA-Z0-9_]+)"$/, function (page, elem, callback) {
        moveTo(page, elem).then(function () {
            callback();
        });
    });

    When(/^I move to ([a-zA-Z0-9_]+) from ([a-zA-Z0-9_]+) page$/, function (elem, page, callback) {
        moveTo(page, elem).then(function () {
            callback();
        });
    });

    When(/^I move to "([a-zA-Z0-9_]+)"."([a-zA-Z0-9_]+)" with an offset of x: (\d+)px, y: (\d+)px$/, function (
            page, elem, offsetX, offsetY, callback) {
        moveWithOffsetTo(page, elem, offsetX, offsetY).then(function () {
            callback();
        });
    });

    When(/^I move to ([a-zA-Z0-9_]+) from ([a-zA-Z0-9_]+) page with an offset of x: (\d+)px, y: (\d+)px$/, function (
            elem, page, offsetX, offsetY, callback) {
        moveWithOffsetTo(page, elem, offsetX, offsetY).then(function () {
            callback();
        });
    });

    When(/^I switch to "([a-zA-Z0-9_]+)"."([a-zA-Z0-9_]+)" frame$/, function (page, elem, callback) {
        switchToFrame(page, elem).then(function () {
            callback();
        });
    });

    When(/^I switch to ([a-zA-Z0-9_]+) frame from ([a-zA-Z0-9_]+) page$/, function (elem, page, callback) {
        switchToFrame(page, elem).then(function () {
            callback();
        });
    });

    When(/^I switch to "([a-zA-Z0-9_]+)"."([a-zA-Z0-9_]+)" non angular frame$/, function (page, elem, callback) {
        switchToNonAngularFrame(page, elem).then(function () {
            callback();
        });
    });

    When(/^I switch to ([a-zA-Z0-9_]+) non angular frame from ([a-zA-Z0-9_]+) page$/, function (elem, page, callback) {
        switchToNonAngularFrame(page, elem).then(function () {
            callback();
        });
    });

    When(/^I switch to default frame$/, function (callback) {
        browser.switchTo().defaultContent().then(function () {
            callback();
        });
    });

    When(/^I execute "([^"]*)"$/, function (script, callback) {
        browser.driver.executeScript(script).then(function () {
            callback();
        });
    });

    When(/^I open new tab$/, function (callback) {
        // Inject a link with target="_blank" to the current page
        browser.driver.executeScript(function () {
            document.body.innerHTML += '<a href="about:blank" id="link-to-open-new-tab" target="_blank">Link</a>';
            return document.body.innerHTML;
        }).then(function () {
            // Click on injected link to open new tab
            return element(by.id('link-to-open-new-tab')).click();
        }).then(function () {
            // Switch to new tab
            return browser.getAllWindowHandles();
        }).then(function (handles) {
            let lastTabHandle = handles[handles.length - 1];

            return browser.switchTo().window(lastTabHandle);
        }).then(function () {
            callback();
        });
    });

    When(/^I close current tab$/, function (callback) {
        // Close current tab/window
        browser.driver.close().then(function () {
            // Switch to last active tab/window
            return browser.getAllWindowHandles();
        }).then(function (handles) {
            let previousTabHandle = handles[handles.length - 1];

            return browser.switchTo().window(previousTabHandle);
        }).then(function () {
            callback();
        });
    });

    When(/^I switch to first tab$/, function (callback) {
        browser.getAllWindowHandles().then(function (handles) {
            let firstTabHandle = handles[0];

            return browser.switchTo().window(firstTabHandle);
        }).then(function () {
            callback();
        });
    });

    When(/^I switch to last tab$/, function (callback) {
        browser.getAllWindowHandles().then(function (handles) {
            let lastTabHandle = handles[handles.length - 1];

            return browser.switchTo().window(lastTabHandle);
        }).then(function () {
            callback();
        });
    });

    When(/^I accept browser alert$/, function (callback) {
        // Waits for an alert to appear
        browser.wait(EC.alertIsPresent(), customTimeout, errors.ALERT_PRESENT);
        browser.switchTo().alert().accept().then(function () {
            callback();
        });
    });

    When(/^I dismiss browser alert$/, function (callback) {
        // Waits for an alert to appear
        browser.wait(EC.alertIsPresent(), customTimeout, errors.ALERT_PRESENT);
        browser.switchTo().alert().dismiss().then(function () {
            callback();
        });
    });

    When(/^I authenticate in browser alert with login "([^"]*)" and password "([^"]*)"$/, function (
            login, password, callback) {
        // Waits for an alert to appear
        browser.wait(EC.alertIsPresent(), customTimeout, errors.ALERT_PRESENT);
        browser.switchTo().alert().authenticateAs(login, password).then(function () {
            callback();
        });
    });

    // #### Then steps #########################################################

    Then(/the title should be "([^"]*)"$/, function (text, callback) {
        expect(browser.getTitle()).to.eventually.equal(text).and.notify(callback);
    });

    Then(/^"([a-zA-Z0-9_]+)"."([a-zA-Z0-9_]+)" should be present$/, function (page, elem, callback) {
        verifyPresent(page, elem).and.notify(callback);
    });

    Then(/^([a-zA-Z0-9_]+) from ([a-zA-Z0-9_]+) page should be present$/, function (elem, page, callback) {
        verifyPresent(page, elem).and.notify(callback);
    });

    Then(/^"([a-zA-Z0-9_]+)"."([a-zA-Z0-9_]+)" should not be present$/, function (page, elem, callback) {
        verifyNotPresent(page, elem).and.notify(callback);
    });

    Then(/^([a-zA-Z0-9_]+) from ([a-zA-Z0-9_]+) page should not be present$/, function (elem, page, callback) {
        verifyNotPresent(page, elem).and.notify(callback);
    });

    Then(/^"([a-zA-Z0-9_]+)"."([a-zA-Z0-9_]+)" text should be "([^"]*)"$/, function (page, elem, text, callback) {
        verifyText(page, elem, text).and.notify(callback);
    });

    Then(/^([a-zA-Z0-9_]+) text from ([a-zA-Z0-9_]+) page should be "([^"]*)"$/, function (elem, page, text, callback) {
        verifyText(page, elem, text).and.notify(callback);
    });

    Then(/^"([a-zA-Z0-9_]+)"."([a-zA-Z0-9_]+)" text should be "([a-zA-Z0-9_]+)"."([a-zA-Z0-9_]+)"$/, function (
            page1, element1, page2, element2, callback) {
        verifyPageObjectText(page1, element1, page2, element2).and.notify(callback);
    });

    Then(/^([a-zA-Z0-9_]+) text from ([a-zA-Z0-9_]+) page should be ([a-zA-Z0-9_]+) from ([a-zA-Z0-9_]+) page$/,
        function (element1, page1, element2, page2, callback) {
            verifyPageObjectText(page1, element1, page2, element2).and.notify(callback);
        }
    );

    Then(/^"([a-zA-Z0-9_]+)"."([a-zA-Z0-9_]+)" text should contain "([^"]*)"$/, function (
            page, elem, textPart, callback) {
        verifyTextContains(page, elem, textPart, callback);
    });

    Then(/^([a-zA-Z0-9_]+) text from ([a-zA-Z0-9_]+) page should contain "([^"]*)"$/, function (
            elem, page, textPart, callback) {
        verifyTextContains(page, elem, textPart, callback);
    });

    Then(/^"([a-zA-Z0-9_]+)"."([a-zA-Z0-9_]+)" text should contain "([a-zA-Z0-9_]+)"."([a-zA-Z0-9_]+)"$/, function (
            page1, element1, page2, element2, callback) {
        const elmnt = composeLocator(page1, element1);
        const textPart = pageObjects[page2][element2];

        elmnt.getText().then(function (text) {
            if (text.indexOf(textPart) === -1) {
                throw new Error(`"${text}" ${errors.CONTAIN} "${textPart}"`);
            } else {
                callback();
            }
        });
    });

    Then(/^URL should be "([^"]*)"$/, function (url, callback) {
        expect(browser.getCurrentUrl()).to.eventually.equal(url).and.notify(callback);
    });

    Then(/^URL should match \/([^"]*)\/$/, function (regexp, callback) {
        browser.getCurrentUrl().then(function (url) {
            if (new RegExp(regexp).test(url)) {
                callback();
            } else {
                throw new Error(`"${url}" ${errors.REGEXP} /${regexp}/`);
            }
        });
    });

    Then(/^URL should contain "([^"]*)"$/, function (urlPart, callback) {
        browser.getCurrentUrl().then(function (url) {
            if (url.indexOf(urlPart) === -1) {
                throw new Error(`"${url}" ${errors.CONTAIN} "${urlPart}"`);
            } else {
                callback();
            }
        });
    });

    // Take a callback as an additional argument to execute when the step is done
    Then(/^the file "([^"]*)" is empty$/, function (fileName, callback) {
        fs.readFile(fileName, 'utf8', function (error, contents) {
            if (error) {
                callback(error);
            } else {
                expect(contents).to.eventually.equal('').and.notify(callback);
            }
        });
    });

});
