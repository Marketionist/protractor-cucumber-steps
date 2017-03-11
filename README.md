# chaindriver

[![Build Status](https://travis-ci.org/Marketionist/chaindriver.svg?branch=master)](https://travis-ci.org/Marketionist/chaindriver)
[![npm version](https://img.shields.io/npm/v/chaindriver.svg)](https://www.npmjs.com/package/chaindriver)
[![NPM License](https://img.shields.io/npm/l/chaindriver.svg)](https://github.com/Marketionist/chaindriver/blob/master/LICENSE)

Stable testing framework with Protractor and Cucumber steps ready to work out of the box

## Supported versions
[Node.js](http://nodejs.org/):
- 6.x
- 7.x

[Protractor](https://www.npmjs.com/package/protractor):
- 4.x
- 5.x

## Installation
To install this package and add it to your package.json just run: `npm install chaindriver --save-dev`.

## CONTRIBUTING
To install all needed packages just use: `npm install`.
To run tests use: `npm test`.
To run tests with any specific parameters add `-- --parameter=value`. For example:

```node
npm test -- --suite=create
```

Tests can be executed locally or remotely using Travis CI. Remote tests run is
triggered by each pull request.

## Thanks
If this plugin was helpful for you, please give it a **★ Star** on
[Github](https://github.com/Marketionist/chaindriver) and
[npm](https://www.npmjs.com/package/chaindriver)
