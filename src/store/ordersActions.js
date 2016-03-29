import OrderState from '../enums/orderState';
import {addError} from './errorsActions';
import {mapHourToDate} from '../services/dateManipulation';
import {browserHistory} from 'react-router';
import {checkFetchForError} from '../services/errorHandling';

export function addNewOrder (order, validationErrorsCallback) {
    return dispatch => {
        fetch('/api/orders', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        })
        .then(checkFetchForError)
        .then(response => response.json())
        .then(createdOrderId => {
            const newOrder = {
                id: createdOrderId,
                deadline: mapHourToDate(order.deadline),
                hungryGuysCount: 0,
                author: order.author,
                restaurant: order.restaurant,
                state: OrderState.Open
            };
            dispatch({type: 'ADD_NEW_ORDER', order: newOrder});
            browserHistory.push('/');
        })
        .catch(error => {
            if (error.apiError) {
                error.response.json().then(data => {
                    dispatch(addError(data.message));
                    if (data.validationErrors.length) {
                        validationErrorsCallback(data.validationErrors);
                    }
                });

                return;
            }

            console.log('caught not API-related error', error);
        });
    };
}

export function hydrateOrders (orders) {
    return {
        type: 'HYDRATE_ORDERS',
        orders
    };
}

export function getOrder (id) {
    return dispatch => {
        fetch(`/api/orders/${id}`)
            .then(response => response.json())
            .then(order => {
                const activeOrder = Object.assign(order, {
                    deadline: new Date(order.deadline),
                    deliveryTime: new Date(order.deliveryTime)
                });
                dispatch({type: 'GET_ORDER', activeOrder});
            })
            .catch(error => {
                console.log(error);
            });
    };
}
