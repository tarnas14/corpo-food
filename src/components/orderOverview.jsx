import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

import {getOrder} from '../store/ordersActions';
import OrderState from '../enums/orderState';
import Chat from './chat';
import MealList from './mealList';
import SignUpForMeal from './signUpForMeal';

const OrderOverview = React.createClass({
    propTypes: {
        dispatch: React.PropTypes.func.isRequired,
        order: React.PropTypes.object.isRequired,
        params: React.PropTypes.object.isRequired,
        resources: React.PropTypes.object.isRequired
    },

    componentDidMount () {
        this.props.dispatch(getOrder(this.props.params.id));
    },

    _dateToString (date) {
        if (!date) {
            return null;
        }
        const minutes = date.getMinutes().toString().length === 1 ? `0${date.getMinutes()}` : date.getMinutes();

        return `${date.getHours()}:${minutes}`;
    },

    renderActionComponents (order) {
        return (
            <div className="row">
                <div className="col-xs-6">
                    <Chat orderId={order.id} />
                </div>
                <div className="col-xs-6">
                    <MealList meals={order.meals} />
                    <SignUpForMeal />
                </div>
            </div>

        );
    },

    render () {
        const {order, resources} = this.props;

        const stateStyle = (() => {
            switch (order.state) {
            case OrderState.Open: return 'primary';
            case OrderState.Ordered: return 'info';
            case OrderState.Delivered: return 'success';
            default: return 'danger';
            }
        })();

        return (
            <div className="row">
                <div className="col-xs-12">
                    <button
                        className="btn btn-default"
                        onClick={() => browserHistory.push('/')}
                    >
                        {resources.backToDashboard}
                    </button>
                    <h2>{order.restaurant} <span className={`label label-${stateStyle}`}>{order.state}</span></h2>
                    <p>{resources.orderBy(order.author)}</p>
                    <p>{resources.orderedAt} {this._dateToString(order.deadline)}</p>
                    <p>{resources.foodExpectedAt} {this._dateToString(order.deliveryTime)}</p>
                    <p>{resources.menu} <a href={order.menu}>{order.menu}</a></p>
                    <p>{resources.extraCostPerMeal} {order.extraCostPerMeal}</p>
                    <p>{resources.deliveryCost} {order.deliveryCost}</p>
                    <div>
                        <h3>{resources.descriptionHeader}</h3>
                        <p>{order.description}</p>
                    </div>
                </div>
                {order.id ? this.renderActionComponents(order) : null}
            </div>
        );
    }
});

export default connect(
    state => ({
        order: state.activeOrder,
        resources: state.localization.resources.orderDetails
    })
)(OrderOverview);
