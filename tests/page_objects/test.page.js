'use strict';

module.exports = (function () {

    let testPage = {

        textError: `//*[ancestor::*[@class="todo-container" and 
            descendant::*[text()="New"]] and @type="checkbox"]`,
        linkTest2Page: '#link-test2-page'

    };

    return testPage;

})();
