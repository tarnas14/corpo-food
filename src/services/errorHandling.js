'use strict';
const Polyglot = require('node-polyglot');

module.exports.handleMongoValidationErrors = (errors, errorResources) => {
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

module.exports.checkFetchForErrors = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    error.apiError = true;
    error.response = response;
    throw error;
};
