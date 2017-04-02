'use strict';

module.exports.config = {
    useAllAngular2AppRoots: true,
    directConnect: true,
    // Set to "custom" instead of cucumber
    framework: 'custom',

    // Path relative to the current config file
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args: [
                // Disable "Chrome is being controlled by automated test software" infobar
                '--disable-infobars'
            ],
            prefs: {
                // Disable Chrome's annoying password manager
                'profile.password_manager_enabled': false,
                'credentials_enable_service': false,
                'password_manager_enabled': false
            }
        }
    },

    // Spec patterns are relative to this directory
    specs: [
        'specs/**/*.feature' // accepts a glob
    ],
    cucumberOpts: {
        // Require step definitions
        require: [
            'step_definitions/**/*.js', // accepts a glob
            '../index.js',
            '../node_modules/.bin/protractor-cucumber-steps/index.js'
        ]
    },
    // Time of retries looking for angular exceeded - timeout in milliseconds
    getPageTimeout: 10000,
    // Before performing any action, Protractor waits until there are no pending
    // asynchronous tasks in your Angular application
    allScriptsTimeout: 120000,

    // Custom parameters can be specified here
    params: {
        // Path to file with all page objects
        pageObjects: require('./page_objects/index.js'),
        // Custom timeout to wait for elements on the page
        customTimeout: 5000,
        // Params for setting browser window width and height - can be also
        // changed via the command line as: --params.browserConfig.width 1024
        browserConfig: {
            width: 1280,
            height: 1024
        }
    },

    plugins: [{
        inline: {
            /*
             * Sets up plugins before tests are run. This is called after the WebDriver
             * session has been started, but before the test framework has been set up.
             *
             * @this {Object} bound to module.exports
             *
             * @throws {*} If this function throws an error, a failed assertion is added to
             *     the test results.
             *
             * @return {q.Promise=} Can return a promise, in which case protractor will wait
             *     for the promise to resolve before continuing.  If the promise is
             *     rejected, a failed assertion is added to the test results.
             */
            setup: function () {
            },
            /*
             * This is called before the test have been run but after the test framework has
             * been set up.  Analogous to a config file's `onPreare`.
             *
             * Very similar to using `setup`, but allows you to access framework-specific
             * variables/funtions (e.g. `jasmine.getEnv().addReporter()`)
             *
             * @throws {*} If this function throws an error, a failed assertion is added to
             *     the test results.
             *
             * @return {Q.Promise=} Can return a promise, in which case protractor will wait
             *     for the promise to resolve before continuing.  If the promise is
             *     rejected, a failed assertion is added to the test results.
            */
            onPrepare: function () {
                // If you need to navigate to a page which does not use Angular,
                // you can turn off waiting for Angular
                // browser.ignoreSynchronization = true;

                // Set custom window size for browser
                browser.driver.manage().window().setSize(
                    browser.params.browserConfig.width,
                    browser.params.browserConfig.height
                );
            }
        }
    }]
};
