import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
import test from 'tape-catch';

import * as actions from '../../../src/store/ordersActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

test('should dispatch loading action and get action when getting an order', t => {
    // given
    const id = 1;
    fetchMock.get(`/api/orders/${id}`, {});
    const store = mockStore({});

    // when
    return store.dispatch(actions.getOrder(id))
        .then(() => {
            // then
            t.equal(2, store.getActions().length);
            t.equal(store.getActions()[0].type, 'FETCHING_ORDER');
            t.equal(store.getActions()[1].type, 'GET_ORDER');
            t.end();
        })
        .catch(error => t.end(error.toString()));
});

test('should dispatch loading action and get action when getting an order for management', t => {
    // given
    const accessCode = 'asd1';
    fetchMock.get(`/api/orders/manage/${accessCode}`, {});
    const store = mockStore({});

    // when
    return store.dispatch(actions.getOrderToManage(accessCode))
        .then(() => {
            // then
            t.equal(2, store.getActions().length);
            t.equal(store.getActions()[0].type, 'FETCHING_ORDER');
            t.equal(store.getActions()[1].type, 'GET_ORDER');
            t.end();
        })
        .catch(error => t.end(error.toString()));
});
