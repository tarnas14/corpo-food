export const hydrateMessages = messages => {
    return dispatch => {
        dispatch({type: 'GET_MESSAGES', messages: messages});
    };
};
