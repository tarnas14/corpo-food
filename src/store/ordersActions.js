export function addNewOrder (order) {
    return dispatch => {
        fetch('/api/order', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        }).then(() => {
            dispatch({type: 'ADD_NEW_ORDER', order: order});
        }).catch(error => {
            console.log(error);
        });
    };
}
