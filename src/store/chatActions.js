export const getMessages = orderId => {
    return dispatch => {
        const dummyMessages = [
            {user: 'janek', message: 'hello world'},
            {user: 'roman', message: 'hello janek'}
        ];
        dispatch({type: 'GET_MESSAGES', messages: dummyMessages});
    };
};
