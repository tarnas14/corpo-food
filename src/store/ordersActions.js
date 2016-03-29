import OrderState from '../enums/orderState';
import {addError} from './errorsActions';
import {mapHourToDate} from '../services/dateManipulation';
import {browserHistory} from 'react-router';
import {checkFetchForErrors} from '../services/errorHandling';

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
        .then(checkFetchForErrors)
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

export function hydrateOrders () {
    return dispatch => {
        fetch('/api/orders')
        .then(checkFetchForErrors)
        .then(response => response.json())
        .then(orders => {
            const ordersToday = orders.map(orderWithStringDates => {
                return {
                    ...orderWithStringDates,
                    deadline: new Date(orderWithStringDates.deadline)
                };
            })
            .filter(order => {
                const today = new Date();

                return today.getFullYear() === order.deadline.getFullYear() &&
                    today.getMonth() === order.deadline.getMonth() &&
                    today.getDate() === order.deadline.getDate();
            });

            dispatch({type: 'HYDRATE_ORDERS', orders: ordersToday});
        })
        .catch(error => console.log(error));
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
