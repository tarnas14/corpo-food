'use strict';

let errorIdSource = 0;
module.exports.addError = message => {
    return {
        type: 'ADD_ERROR',
        error: {
            message,
            id: errorIdSource++
        }
    };
};

module.exports.dismissError = errorId => {
    return {
        type: 'DISMISS_ERROR',
        errorId
    };
};
