# protractor-cucumber-steps

[![Build Status](https://travis-ci.org/Marketionist/protractor-cucumber-steps.svg?branch=master)](https://travis-ci.org/Marketionist/protractor-cucumber-steps)
[![npm version](https://img.shields.io/npm/v/protractor-cucumber-steps.svg)](https://www.npmjs.com/package/protractor-cucumber-steps)
[![NPM License](https://img.shields.io/npm/l/protractor-cucumber-steps.svg)](https://github.com/Marketionist/protractor-cucumber-steps/blob/master/LICENSE)

Cucumber steps (step definitions) written with Protractor for end-to-end tests

## Supported versions
[Node.js](http://nodejs.org/):
- 6.x
- 7.x

[Protractor](https://www.npmjs.com/package/protractor):
- 4.x
- 5.x

## Installation
To install this package and add it to your package.json just run:
```
npm install protractor-cucumber-steps --save-dev
```

## Importing and enabling
This package is used as plugin with
[protractor](https://www.npmjs.com/package/protractor) and
[protractor-cucumber-framework](https://www.npmjs.com/package/protractor-cucumber-framework).
It is quite simple to use - to get access to all Cucumber steps defined in this
plugin just:
- add the path to protractor-cucumber-steps (in `cucumberOpts` -> `require`);
- add the path to your page object file (in `params` -> `pageObjects`) inside `protractor.config.js`.

Here is a short config example:

```javascript
exports.config = {
    // set to "custom" instead of cucumber
    framework: 'custom',

    // path relative to the current config file
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    // require feature files
    specs: [
        'path/to/feature/files/**/*.feature' // accepts a glob
    ],

    cucumberOpts: {
        // require step definitions
        require: [
            './node_modules/.bin/protractor-cucumber-steps/index.js', // path to protractor-cucumber-steps
            'path/to/your/step/definitions/**/*.steps.js' // accepts a glob
        ]
    },

    // Custom parameters can be specified here
    params: {
        pageObjects: require('./page_objects/index.js') // path to your page object file
    }
};
```

You can also see the example of [`protractor.config.js`](https://github.com/Marketionist/protractor-cucumber-steps/blob/master/tests/protractor.conf.js)

## List of predefined steps
You can see the example of how to use predefined steps in [`test.feature`](https://github.com/Marketionist/protractor-cucumber-steps/blob/master/tests/specs/test.feature)

### When steps
- `I go to URL "([^"]*)"` - Open a site (by its URL provided in "") in the current browser window/tab
- `I go to "([^"]*)"."([^"]*)"` - Open a site (by its URL provided in "page"."object") in the current browser window/tab
- `I click "([^"]*)"."([^"]*)` - Click on any element (provided in "page"."object")
- `I wait and click "([^"]*)"."([^"]*)"` - Wait for 300 ms and click on any element (provided in "page"."object")
- `I click "([^"]*)"."([^"]*)" if present` - Click on any element (provided in "page"."object") only if it is present on the page
- `I wait for (\d+) ms` - Wait for provided amount of time (in milliseconds). Maximum value is 300000 (equals to 5 minutes)
- `I type "([^"]*)" in the "([^"]*)"."([^"]*)"` - Type any text (provided in "" as a string) in the input field (provided in "page"."object")
- `I type "([^"]*)"."([^"]*)" in the "([^"]*)"."([^"]*)"` - Type any text (provided in "page1"."object1") in the input field (provided in "page2"."object2")

### Then steps
- `the title should equal to "([^"]*)"` - Validate the title (provided in "" as a string) of the current browser window/tab
- `"([^"]*)"."([^"]*)" should be present` - Validate that the element (provided in "page"."object") is present on the page
- `"([^"]*)"."([^"]*)" has text "([^"]*)"` - Validate that the element (provided in "page"."object") has text (provided in "" as a string)
- `"([^"]*)"."([^"]*)" has text "([^"]*)"."([^"]*)"` - Validate that the element (provided in "page1"."object1") has text (provided in "page2"."object2")
- `the file "([^"]*)" is empty` - Validate that the file (with name provided in "" as a string) is empty

## Contributing
You are welcome to contribute - please see
[CONTRIBUTING.md](https://github.com/Marketionist/protractor-cucumber-steps/blob/master/CONTRIBUTING.md)
to help you get started.

## Thanks
If this plugin was helpful for you, please give it a **★ Star** on
[Github](https://github.com/Marketionist/protractor-cucumber-steps) and
[npm](https://www.npmjs.com/package/protractor-cucumber-steps)
