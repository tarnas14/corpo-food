import React from 'react';
import DOM from 'react-dom';
import {createStore, combineReducers} from 'redux';
import {Provider, connect} from 'react-redux';
import {Router, Route, Link, browserHistory} from 'react-router';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';
import {orderNotices} from '../store/orderNotices';

import Index from './index';
import userData from '../store/userData';

// Add the reducer to your store on the `routing` key
const store = createStore(
    combineReducers({
        userData,
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
            <Route path="/" component={Index} />
            <Route path="/korposzczury" component={Korposzczury} />
            <Route path="/ala" component={ConnectedAla} />
        </Router>
    </Provider>,
    document.getElementById('main-container')
);
