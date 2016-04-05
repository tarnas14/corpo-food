export const hydrateMessages = messages => {
    return {type: 'GET_MESSAGES', messages: messages};
};

export const sendMessage = message => {
    return dispatch => {
        dispatch({type: 'SEND_MESSAGE', message: message});
    };
};
