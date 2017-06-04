'use strict';

module.exports = (function () {

    let testPage = {

        pageTest1: 'http://localhost:8001/test1.html',
        textError: `//*[ancestor::*[@class="todo-container" and 
            descendant::*[text()="New"]] and @type="checkbox"]`,
        linkTest2Page: '#link-test2-page',
        txtTest2: 'Test2',
        linkInvisibleTest2Page: '#link-invisible-test2-page'

    };

    return testPage;

})();
