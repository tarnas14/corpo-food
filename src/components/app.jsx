import React from 'react';
import DOM from 'react-dom';
import {createStore, combineReducers} from 'redux';
import {Provider, connect} from 'react-redux';
import {Router, Route, Link, browserHistory} from 'react-router';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';
import {orderNotices} from '../store/orderNotices';

import Index from './index';
import NewOrderForm from './NewOrderForm';
import userData from '../store/userData';
import orders from '../store/orders';

// Add the reducer to your store on the `routing` key
const store = createStore(
    combineReducers({
        userData,
        orders: orders,
        routing: routerReducer,
        orderNotices
    })
);

const history = syncHistoryWithStore(browserHistory, store);

const Korposzczury = React.createClass({
    render () {
        return <div>
            <Link to="/ala">ala</Link>
            Korposzczury
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
            <Route path="/korposzczury" component={Korposzczury} />
            <Route component={NewOrderForm} path="/newOrder" />
            <Route component={ConnectedAla} path="/ala" />
        </Router>
    </Provider>,
    document.getElementById('main-container')
);
