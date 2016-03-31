export const errors = (state = [], action) => {
    switch (action.type) {
    case 'ADD_ERROR':
        return [...state, action.error];
    case 'DISMISS_ERROR':
        return state.filter(error => error.id !== action.errorId);
    default:
        return state;
    }
};
