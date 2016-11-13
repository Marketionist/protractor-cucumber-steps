'use strict';
/* global browser, expect */
/* eslint new-cap: 0 */  // --> OFF for Given, When, Then

// Use the external Chai As Promised to deal with resolving promises in
// expectations.
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

var expect = chai.expect;

// Chai expect().to.exist syntax makes default jshint unhappy.

module.exports = function () {

    this.Then(/the title should equal "([^"]*)"$/, function (text, next) {
        expect(browser.getTitle()).to.eventually.equal(text).and.notify(next);
    });

    // this.Then(/^"([^"]*)"."([^"]*)" should have text "([^"]*)"."([^"]*)"$/,
    //     function (page1, element1, page2, element2, callback) {
    //         var task = browser.params.pageObjects[page1][element1];
    //         var tasksAll = element.all(by.css(task));

    //         expect(tasksAll.count()).to.eventually.equal(3);
    //         expect(tasksAll.get(2).getText()).to.eventually
    //             .equal(browser.params.pageObjects[page2][element2]).and.notify(callback);
    //     });

};
