let errorIdSource = 0;
export function addError (message) {
    return {
        type: 'ADD_ERROR',
        error: {
            message,
            id: errorIdSource++
        }
    };
}

export function dismissError (errorId) {
    return {
        type: 'DISMISS_ERROR',
        errorId
    };
}
