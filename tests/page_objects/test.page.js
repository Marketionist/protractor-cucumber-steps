'use strict';

module.exports = (function () {

    let testPage = {

        mainURL: 'http://maxcabrera.com/code/todo-list/',
        textError: `//*[ancestor::*[@class="todo-container" and 
            descendant::*[text()="New"]] and @type="checkbox"]`,
        linkBack: 'a[href="http://maxcabrera.com/"]'

    };

    return testPage;

})();
