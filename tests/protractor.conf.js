'use strict';

// Add testing server to provide pages for tests
const nodeTestingServer = require('node-testing-server').nodeTestingServer;

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
        // Require step definition files before executing features
        'require': [
            'step_definitions/**/*.js', // accepts a glob
            '../index.js',
            '../node_modules/protractor-cucumber-steps/index.js'
        ],
        // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output
        'format': 'node_modules/cucumber-pretty',
        'format-options': '{ "pretty": { "summary": true, "passed": true } }',
        // <string[]> (expression) only execute the features or scenarios with tags matching the expression
        'tags': [],
        // <boolean> fail if there are any undefined or pending steps
        'strict': true,
        // <boolean> invoke formatters without executing steps
        'dry-run': false,
        // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE
        'compiler': []
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
            teardown: function () {
            }
        }
    }],
    /*
    * A callback function called once configs are read but before any
    * environment setup. This will only run once, and before onPrepare.
    *
    * You can specify a file containing code to run by setting beforeLaunch to
    * the filename string.
    *
    * At this point, global variable 'protractor' object will NOT be set up,
    * and globals from the test framework will NOT be available. The main
    * purpose of this function should be to bring up test dependencies.
    */
    beforeLaunch: function () {
        // Settings for node testing server
        nodeTestingServer.config = {
            hostname: 'localhost',
            port: 8001,
            logsEnabled: 0,
            pages: {
                '/test1.html': `<title>Test1 Page</title><a id="link-test2-page" href="
                    http://localhost:8001/test2.html">Test2 page</a>
                    <script>
                        window.onload = function() {
                            document.querySelector('h1').addEventListener("mouseover", function() {
                                document.getElementById("text-test").innerHTML = 'Test 1 sample text';
                            });
                            document.querySelector('h1').addEventListener("mouseout", function() {
                                document.getElementById("text-test").innerHTML = '';
                            });
                        }
                    </script>
                    <h1>Test1 page</h1>
                    <p id="text-test"></p>`,
                '/test2.html': `<title>Test2 Page</title>
                    <script>
                        window.onload = function() {
                            document.getElementById("dropdown-colors").addEventListener("change", function() {
                                document.getElementById("block-selected-color").innerHTML = document
                                    .getElementById("dropdown-colors").value;
                            });
                        }
                    </script>
                    <h1>Test2 page</h1>
                    <p>Selected color is: <span id="block-selected-color"></span></p>
                    <select id="dropdown-colors" name="colors">
                        <option value="default color">Default color</option>
                        <option value="black">Black</option>
                        <option value="grey">Grey</option>
                        <option value="white">White</option>
                        <option value="red">Red</option>
                        <option value="crimson">Crimson</option>
                        <option value="magenta">Magenta</option>
                        <option value="blue">Blue</option>
                        <option value="aqua">Aqua</option>
                        <option value="cyan">Cyan</option>
                        <option value="indigo">Indigo</option>
                        <option value="green">Green</option>
                        <option value="yellow">Yellow</option>
                        <option value="Gold">Gold</option>
                        <option value="orange">Orange</option>
                    </select>`,
                '/test-iframe.html': `<title>Test Page with iframe</title>
                    <h1>Test page with iframe</h1>
                    <iframe src="test1.html" id="iframe-test1" name="test iframe" width="400" height="300" align="left">
                        <p>Your browser does not support iframes</p>
                    </iframe>`,
                '/test-alert.html': `<title>Test Page with alert</title>
                    <script>
                        window.onload = function() {
                            document.getElementById("button-launch-alert").addEventListener("click", function() {
                                let alertStatus;
                                if (confirm("Accept (OK) or Dismiss (Cancel) - press a button!") == true) {
                                    alertStatus = "Alert was accepted!";
                                } else {
                                    alertStatus = "Alert was canceled!";
                                }
                                document.getElementById("block-alert-status").innerHTML = alertStatus;
                            });
                        }
                    </script>
                    <h1>Test page with alert</h1>
                    <button id="button-launch-alert">Launch alert</button>
                    <p id="block-alert-status"></p>`
            }
        }
        // Start node testing server
        return nodeTestingServer.start();
    },
    /*
    * A callback function called once all tests have finished running and
    * the WebDriver instance has been shut down. It is passed the exit code
    * (0 if the tests passed). afterLaunch must return a promise if you want
    * asynchronous code to be executed before the program exits.
    * This is called only once before the program exits (after onCleanUp).
    */
    afterLaunch: function () {
        // Stop node testing server
        return Promise.resolve(nodeTestingServer.stop());
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
        browser.ignoreSynchronization = true;

        // Set custom window size for browser
        browser.driver.manage().window().setSize(
            browser.params.browserConfig.width,
            browser.params.browserConfig.height
        );
    }
};
