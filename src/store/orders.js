const orders = (state = [], action) => {
    switch (action.type) {
    case 'ADD_NEW_ORDER':
        return [
            ...state,
            action.order
        ];
    default:
        return state;
    }
};

export default orders;
