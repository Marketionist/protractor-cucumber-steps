# Contributer's Guide

We welcome contributions - thanks for taking the time to contribute! Here are
some guidelines to help you get started. These are just guidelines, not rules,
so use your best judgment and feel free to propose changes to this document in
a pull request.

## Discussion

While not absolutely required, it is encouraged that you first open an
[issue](https://github.com/Marketionist/protractor-cucumber-steps/issues)
for any bug or feature request. This allows discussion on the proper course of
action to take before coding begins.

## Building

```shell
npm install
```

## Changing

Most of the information you need to contribute code changes can [be found here](https://guides.github.com/activities/contributing-to-open-source/).
In short: fork, make your changes and submit a pull request (PR).

### Fork

Fork the project [on Github](https://github.com/Marketionist/protractor-cucumber-steps)
and check out your copy locally:

```shell
git clone https://github.com/Marketionist/protractor-cucumber-steps.git
cd protractor-cucumber-steps
```

### Create your branch

Create a feature branch and start hacking:

```shell
git checkout -b my-feature-branch origin/master
```

We practice HEAD-based development, which means all changes are applied
directly on top of master.

### Commit

First make sure git knows your name and email address:

```shell
git config --global user.name 'John Doe'
git config --global user.email 'john@example.com'
```

**Writing good commit message is important.** A commit message should be around
50 characters or less and contain a short description of the change and
reference issues fixed (if any). Include `Fixes #N`, where _N_ is the issue
number the commit fixes, if any.

### Rebase

Use `git rebase` (not `git merge`) to sync your work with the core repository
from time to time:

```shell
git remote add upstream https://github.com/Marketionist/protractor-cucumber-steps.git
git fetch upstream
git rebase upstream/master
```

### Test

Bug fixes and features **should have tests**. Look at other tests to see how
they should be structured.

This project makes use of code linting and e2e tests to make sure we don't break
anything. Before you submit your pull request make sure you pass all the tests:

You can run code linting with: `npm run lint`.
You can run all the e2e tests with: `npm test`.

To run tests with any specific parameters add `-- --parameter value`. For example:

```node
npm test -- --cucumberOpts.tags @Tag,@AnotherTag
```

Tests can be executed locally or remotely using Travis CI. Remote tests run is
triggered by each pull request.

### Push

```shell
git push origin my-feature-branch
```

Go to https://github.com/yourusername/protractor-cucumber-steps.git and press the
_New pull request_ button and fill out the form.

A good PR comment message can look like this:

```text
Explain PR normatively in one line

Details of PR message are a few lines of text, explaining things
in more detail, possibly giving some background about the issue
being fixed, etc.

Fixes #142
```

Pull requests are usually reviewed within a few days. If there are comments to
address, apply your changes in new commits (preferably
[fixups](http://git-scm.com/docs/git-commit)) and push to the same branch.

### Integration

When code review is complete, a committer will take your PR and integrate it on
protractor-cucumber-steps master branch. Because we like to keep a linear history
on the master branch, we will normally squash and rebase your branch history.

## Publishing

So the time has come to publish the latest version of protractor-cucumber-steps
to npm - let's rock it!

Before you can actually publish make sure the following statements are true:

- All tests should be green.
- The version number in [package.json](package.json) has been incremented.
- The [changelog](CHANGELOG.md) has been updated with details of the changes in
    this release. Where possible include the details of the
    [issues](https://github.com/Marketionist/protractor-cucumber-steps/issues)
    affected and the [PRs](https://github.com/Marketionist/protractor-cucumber-steps/pulls)
    raised.

OK - you're actually ready. We're going to publish. Here we need to go carefully.
Follow these steps:

- clone protractor-cucumber-steps from the main repo with this command:
    `git clone https://github.com/Marketionist/protractor-cucumber-steps.git`
- [login to npm](https://docs.npmjs.com/cli/adduser) if you need to: `npm login`
- install protractor-cucumber-steps packages with: `npm install`
- run linting to check the code: `npm run lint`
- run the tests to ensure all is still good: `npm test`

If all the tests passed then we're going to ship:
- Tag the release in git. You can see existing tags with the command: `git tag`.
    If the version in your `package.json` is `"1.0.1"` then you would tag the
    release like so: `git tag v1.0.1`. For more on type of tags we're using read
    [here](https://git-scm.com/book/en/v2/Git-Basics-Tagging#Lightweight-Tags).
- Push the tag so the new version will show up in the
    [releases](https://github.com/Marketionist/protractor-cucumber-steps/releases):
    `git push origin --tags`.
- On the releases page, click the "Draft a new release button" and, on the
    presented page, select the version you've just released, name it and copy in
    the new markdown that you added to the [changelog](CHANGELOG.md).
- Now the big moment of publishing updated package to npm: `npm publish`.

Or use the short way:
- From the master branch run `npm run patch` or `npm run minor` or `npm run major`
    depending on the severity of changes you are publishing in this release.
- On the releases page, click the "Draft a new release button" and, on the
    presented page, select the version you've just released, name it and copy in
    the new markdown that you added to the [changelog](CHANGELOG.md).

You've released! Relax and enjoy your accomplishment.
