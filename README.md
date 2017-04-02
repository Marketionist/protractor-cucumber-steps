# protractor-cucumber-steps

[![npm version](https://img.shields.io/npm/v/protractor-cucumber-steps.svg)](https://www.npmjs.com/package/protractor-cucumber-steps)
[![NPM License](https://img.shields.io/npm/l/protractor-cucumber-steps.svg)](https://github.com/Marketionist/protractor-cucumber-steps/blob/master/LICENSE)

Cucumber steps (step definitions) written with Protractor for e2e tests

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
To get access to all Cucumber steps just add the path to
protractor-cucumber-steps (in `cucumberOpts` -> `require`) and path to your page
object file (in `params` -> `pageObjects`) inside `protractor.config.js`. Here
is a short config example:

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

## CONTRIBUTING
To install all needed packages just use:
```
npm install
```

To run tests use:
```
npm test
```

To run tests with any specific parameters add `-- --parameter=value`. For example:

```node
npm test -- --suite=create
```

Tests can be executed locally or remotely using Travis CI. Remote tests run is
triggered by each pull request.

## Thanks
If this plugin was helpful for you, please give it a **★ Star** on
[Github](https://github.com/Marketionist/protractor-cucumber-steps) and
[npm](https://www.npmjs.com/package/protractor-cucumber-steps)
