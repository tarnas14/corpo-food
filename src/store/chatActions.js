export const hydrateMessages = messages => {
    return {type: 'GET_MESSAGES', messages: messages};
};

export const newMessage = message => {
    return dispatch => {
        dispatch({type: 'NEW_MESSAGE', message: message});
    };
};
