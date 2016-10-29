import React from 'react';
import {connect} from 'react-redux';

import OrderState from '../enums/orderState';

const dateToString = (date) => {
    if (!date) {
        return null;
    }
    const minutes = date.getMinutes().toString().length === 1 ? `0${date.getMinutes()}` : date.getMinutes();

    return `${date.getHours()}:${minutes}`;
};

const OrderDetails = React.createClass({
    propTypes: {
        order: React.PropTypes.object.isRequired,
        resources: React.PropTypes.object.isRequired,
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
            <div>
                <h2>{resources.orderingFrom} <strong>{order.restaurant}</strong> <span className={`label label-${stateStyle}`}>{order.state}</span></h2>
                <p>{resources.orderBy}: <strong>{order.author}</strong></p>
                <p>{resources.orderedAt}: <strong>{dateToString(order.deadline)}</strong></p>
                <p>{resources.foodExpectedAt}: <strong>{dateToString(order.deliveryTime)}</strong></p>
                <p>{resources.menu}: <strong><a href={order.menu}>{order.menu}</a></strong></p>
                <p>{resources.extraCostPerMeal}: <strong>{order.extraCostPerMeal}</strong></p>
                <p>{resources.deliveryCost}: <strong>{order.deliveryCost}</strong></p>
                <div>
                    <h3>{resources.descriptionHeader}</h3>
                    <p>{order.description}</p>
                </div>
            </div>
        );
    },
});

export default connect(
    state => ({
        resources: state.localization.resources.orderDetails,
    })
)(OrderDetails);
