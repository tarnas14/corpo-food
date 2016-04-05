export default (state = [], action) => {
    switch (action.type) {
    case 'GET_MESSAGES':
        return action.messages;
    case 'SEND_MESSAGE':
        return [
            ...state,
            action.message
        ];
    default:
        return state;
    }
};
