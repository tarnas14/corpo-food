'use strict';
const Polyglot = require('node-polyglot');

module.exports = (errors, errorResources) => {
    const polyglot = new Polyglot({
        phrases: errorResources
    });
    const errorsDictionary = [];

    for (let property in errors) {
        if (errors.hasOwnProperty(property)) {
            errorsDictionary.push({
                property,
                message: polyglot.t(errors[property].message)
            });
        }
    }

    return errorsDictionary;
};
