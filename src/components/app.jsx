import React from 'react';
import DOM from 'react-dom';
import {Grid, Row, Col, PageHeader} from 'react-bootstrap';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {browserHistory, Router, Route, IndexRoute} from 'react-router';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';

import Dashboard from './dashboard';
import NewOrderForm from './newOrderForm';
import OrderDetails from './orderDetails';
import orders from '../store/orders';

// Add the reducer to your store on the `routing` key
const store = createStore(
    combineReducers({
        orders,
        routing: routerReducer
    }),
    applyMiddleware(thunkMiddleware)
);

const history = syncHistoryWithStore(browserHistory, store);

const App = React.createClass({
    propTypes: {
        children: React.PropTypes.array
    },

    render () {
        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <PageHeader>Corpo food <small>orderuj food bez fakapu</small></PageHeader>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        {this.props.children}
                    </Col>
                </Row>
            </Grid>
        );
    }
});

DOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route component={App} path="/">
                <IndexRoute component={Dashboard} />
                <Route component={NewOrderForm} path="newOrder" />
                <Route component={OrderDetails} path="order" />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('main-container')
);
