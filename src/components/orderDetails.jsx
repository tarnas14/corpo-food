import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

import {getOrder} from '../store/ordersActions';
import OrderState from '../enums/orderState';

const OrderDetails = React.createClass({
    propTypes: {
        cols: React.PropTypes.number.isRequired,
        order: React.PropTypes.object.isRequired,
        resources: React.PropTypes.object.isRequired
    },

    _dateToString (date) {
        if (!date) {
            return null;
        }
        const minutes = date.getMinutes().toString().length === 1 ? `0${date.getMinutes()}` : date.getMinutes();

        return `${date.getHours()}:${minutes}`;
    },

    render () {
        const {order, resources, cols} = this.props;

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
                <div className={`col-xs-${cols}`}>
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
            </div>
        );
    }
});

export default connect(
    state => ({
        resources: state.localization.resources.orderDetails
    })
)(OrderDetails);
