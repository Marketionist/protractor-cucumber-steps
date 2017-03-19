module.exports.censor = function (obj, replacer, indent) {
    let printedObjects = [];
    let printedObjectKeys = [];

    /**
     * Turns object to string
     * @param {string} key
     * @param {string/promise} value
     * @returns {object} stringified JSON
     */
    function printReplacer(key, value) {
        let maximumSerializedObjects = 2000; // Browsers will not print more than 20K, let's limit to 2K

        if (printedObjects.length > maximumSerializedObjects) {
            return 'object too long';
        }
        let printedObjIndex = false;

        printedObjects.forEach(function (objct, index) {
            if (objct === value) {
                printedObjIndex = index;
            }
        });

        if (key === '') { // root element
            printedObjects.push(obj);
            printedObjectKeys.push('root');
            return value;
        }

        else if (printedObjIndex + '' !== 'false' && typeof value === 'object') {
            if (printedObjectKeys[printedObjIndex] === 'root') {
                return '(pointer to root)';
            } else {
                let valueBoolean = !!value && !!value.constructor;

                return '(see ' + (valueBoolean ? value.constructor.name : typeof value) +
                    ' with key ' + printedObjectKeys[printedObjIndex] + ')';
            }
        } else {

            let qualifiedKey = key || '(empty key)';

            printedObjects.push(value);
            printedObjectKeys.push(qualifiedKey);
            if (replacer) {
                return replacer(key, value);
            } else {
                return value;
            }
        }
    }
    let stringifiedJSON = JSON.stringify(obj, printReplacer, indent);

    console.log('==[Start censor]==\n=[Locator]: ' +
        JSON.parse(stringifiedJSON).parentElementArrayFinder.locator_.value +
        '\n=[Full JSON]: ' + stringifiedJSON + '\n==[End censor]==');
    return stringifiedJSON;
};
