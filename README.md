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
- add the path to protractor-cucumber-steps (in `cucumberOpts` -> `require`) inside `protractor.conf.js`;
- add the path to your page object file (in `params` -> `pageObjects`) inside `protractor.conf.js`.

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

You can also see the example of [`protractor.conf.js`](https://github.com/Marketionist/protractor-cucumber-steps/blob/master/tests/protractor.conf.js)

## List of predefined steps
You can see the example of how to use predefined steps in [`test.feature`](https://github.com/Marketionist/protractor-cucumber-steps/blob/master/tests/specs/test.feature)

### When steps
- `I go to URL "..."` - Open a site (by its URL provided in "" as a string) in the current browser window/tab
- `I go to "..."."..."` - Open a site (by its URL provided in "page"."object") in the current browser window/tab
- `I reload the page` - Reload current page
- `I click "..."."..."` - Click on any element (provided in "page"."object" as CSS or XPath selector)
- `I wait and click "..."."..."` - Wait for 300 ms and click on any element (provided in "page"."object" as CSS or XPath selector)
- `I click "..."."..." if present` - Click on any element (provided in "page"."object" as CSS or XPath selector) only if it is present on the page
- `I double click "..."."..."` - Double click on any element (provided in "page"."object" as CSS or XPath selector)
- `I wait for (\d+) ms` - Wait for provided amount of time (in milliseconds). Maximum value is 300000 (equals to 5 minutes)
- `I wait for "..."."..." to be present` - Wait for element (provided in "page"."object" as CSS or XPath selector) to be present on the page (by default waits for 5000 ms, this time can be changed by specifying `params.customTimeout` inside `protractor.conf.js` - see the [example](https://github.com/Marketionist/protractor-cucumber-steps/blob/master/tests/protractor.conf.js))
- `I type "..." in "..."."..."` - Type any text (provided in "" as a string) in the input field (provided in "page"."object" as CSS or XPath selector)
- `I type "..."."..." in "..."."..."` - Type any text (provided in "page1"."object1") in the input field (provided in "page2"."object2" as CSS or XPath selector)
- `I move to "..."."..."` - Move the mouse pointer over any element (hover with cursor an element provided in "page"."object" as CSS or XPath selector)
- `I move to "..."."..." with an offset of x: (\d+)px, y: (\d+)px` - Move the mouse pointer over any element (hover with cursor an element provided in "page"."object" as CSS or XPath selector) with an offset of x: ...px, y: ...px
- `I switch to "..."."..." frame` - Switch the context to iframe (provided in "page"."object" as CSS or XPath selector)
- `I switch to "..."."..." non angular frame` - Switch the context to non angular iframe (provided in "page"."object" as CSS or XPath selector)
- `I switch to default frame` - Switch the context back to default (initial) frame

### Then steps
- `the title should be "..."` - Validate that title of the current browser window/tab equals to the text (provided in "" as a string)
- `"..."."..." should be present` - Validate that element (provided in "page"."object" as CSS or XPath selector) is present on the page
- `"..."."..." should not be present` - Validate that element (provided in "page"."object" as CSS or XPath selector) is not present on the page
- `"..."."..." text should be "..."` - Validate that text of the element (provided in "page"."object" as CSS or XPath selector) equals to the text (provided in "" as a string)
- `"..."."..." text should be "..."."..."` - Validate that text of the element (provided in "page1"."object1" as CSS or XPath selector) equals to the text (provided in "page2"."object2")
- `"..."."..." text should contain "..."` - Validate that text of the element (provided in "page"."object" as CSS or XPath selector) contains the text (provided in "" as a string)
- `"..."."..." text should contain "..."."..."` - Validate that text of the element (provided in "page1"."object1" as CSS or XPath selector) contains the text (provided in "page2"."object2")
- `URL should be "..."` - Validate that URL of the current page equals to the text (provided in "" as a string)
- `URL should match /.../` - Validate that URL of the current page matches the regular expression pattern (provided inside // like: /pattern/)
- `URL should contain "..."` - Validate that URL of the current page contains the text (provided in "" as a string)
- `the file "..." is empty` - Validate that the file (with name provided in "" as a string) is empty

## How to comment out a line in the feature file
You can add comments in `.feature` files using `#` for single line comments.
Multiline (or block) comments are not supported in Gherkin out of the box (see
https://github.com/cucumber/gherkin/issues/203), so you have to prefix all lines
with `#` like this:

```
# Test single line comment 1
# Test single line comment 2
Scenario: Commit to open source should be joyful
  When I commit
  Then I get a star
  # And a commented out step
```

## Contributing
You are welcome to contribute - please see
[CONTRIBUTING.md](https://github.com/Marketionist/protractor-cucumber-steps/blob/master/CONTRIBUTING.md)
to help you get started

## Thanks
If this plugin was helpful for you, please give it a **★ Star** on
[Github](https://github.com/Marketionist/protractor-cucumber-steps) and
[npm](https://www.npmjs.com/package/protractor-cucumber-steps)
