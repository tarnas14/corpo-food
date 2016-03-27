import OrderState from '../enums/orderState';
import {addError} from './errorsActions';
import {mapHourToDate} from '../services/dateManipulation';
import {browserHistory} from 'react-router';

export function addNewOrder (order) {
    return dispatch => {
        fetch('/api/orders', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        })
        .then(response => {
            if (response.status >= 200 && response.status < 300) {
                return response;
            }

            const error = new Error(response.statusText);
            error.apiError = true;
            error.response = response;
            throw error;
        })
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
                        // handle validation errors
                    }

                    return;
                });
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
