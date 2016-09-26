import React from 'react';
import {connect} from 'react-redux';
import {getOrder} from '../store/ordersActions';
import OrderState from '../enums/orderState';
import {browserHistory} from 'react-router';
import Chat from './chat';

const OrderDetails = React.createClass({
    propTypes: {
        dispatch: React.PropTypes.func.isRequired,
        order: React.PropTypes.object.isRequired,
        params: React.PropTypes.object.isRequired
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

    render () {
        const {order} = this.props;

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
                    <button onClick={() => browserHistory.push('/')} className="btn btn-default">Go back to dashboard</button>
                </div>
                <div className="col-xs-12">
                    <h2>{order.restaurant} <span className={`label label-${stateStyle}`}>{order.state}</span></h2>
                    <p>Zamawia {order.author}</p>
                    <p>Dedlajn: {this._dateToString(order.deadline)}</p>
                    <p>Na kiedy: {this._dateToString(order.deliveryTime)}</p>
                    <p>Menu: <a href={order.menu}>{order.menu}</a></p>
                    <p>Ekstra koszt per meal: {order.extraCostPerMeal}</p>
                    <p>Koszt deliweru: {order.deliveryCost}</p>
                    <div>
                        <h3>Opis</h3>
                        <p>{order.description}</p>
                    </div>
                    {order.id ? <Chat orderId={order.id} /> : null}
                </div>
            </div>
        );
    }
});

export default connect(
    state => ({order: state.activeOrder})
)(OrderDetails);
