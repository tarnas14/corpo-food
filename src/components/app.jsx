import React from 'react';
import DOM from 'react-dom';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';

import Index from './index';
import NewOrderForm from './NewOrderForm';
import orders from '../store/orders';

// Add the reducer to your store on the `routing` key
const store = createStore(
    combineReducers({
        orders: orders,
        routing: routerReducer
    }),
    applyMiddleware(thunkMiddleware)
);

const history = syncHistoryWithStore(browserHistory, store);

DOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route component={Index} path="/" />
            <Route component={NewOrderForm} path="/newOrder" />
        </Router>
    </Provider>,
    document.getElementById('main-container')
);
