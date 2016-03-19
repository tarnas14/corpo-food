import React from 'react';
import DOM from 'react-dom';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider, connect} from 'react-redux';
import {Router, Route, Link, browserHistory} from 'react-router';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';

import Index from './index';
import NewOrderForm from './NewOrderForm';
import userData from '../store/userData';
import orders from '../store/orders';

// Add the reducer to your store on the `routing` key
const store = createStore(
    combineReducers({
        userData: userData,
        orders: orders,
        routing: routerReducer
    })
);

const history = syncHistoryWithStore(browserHistory, store);

const Korposzury = React.createClass({
    render () {
        return <div>
            <Link to="/ala">ala</Link>
            Korposzury
        </div>;
    }
});

const Ala = React.createClass({
    render () {
        return (
            <div>
                <button onClick={() => {
                    this.props.dispatch({type: 'CHANGE_NAME', name: 'krzys'});
                }}>
                    zmien imie
                </button>
                {this.props.userData.name}
            </div>
        );
    }
});

const ConnectedAla = connect(
    state => ({userData: state.userData})
)(Ala);

DOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route component={Index} path="/" />
            <Route component={NewOrderForm} path="/newOrder" />
            <Route component={Korposzury} path="/korposzury"  />
            <Route component={ConnectedAla} path="/ala" />
        </Router>
    </Provider>,
    document.getElementById('main-container')
);
