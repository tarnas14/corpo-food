
const userData = (state = {name: 'ala'}, action) => {
    console.log(action);
    switch (action.type) {
    case 'CHANGE_NAME':
        return {
            name: action.name
        }
    default:
        return state;
    }
};

export default userData;
