import React from 'react';
import {connect} from 'react-redux';

import {getOrderToManage, foodOrdered} from '../store/ordersActions';
import OrderDetails from './orderDetails';
import Chat from './chat';
import OrderState from '../enums/orderState';
import messageBuilderFactory from '../utils/messageBuilderFactory';

const ManageOrder = React.createClass({
    propTypes: {
        dispatch: React.PropTypes.func.isRequired,
        order: React.PropTypes.object.isRequired,
        params: React.PropTypes.object.isRequired
    },

    componentDidMount () {
        this.props.dispatch(getOrderToManage(this.props.params.accessCode));
    },

    renderActions () {
        const {state: orderState} = this.props.order;

        switch (orderState) {
        case (OrderState.Open):
            return (
                <button
                    className="btn btn-primary"
                    onClick={() => this.props.dispatch(foodOrdered(this.props.params.accessCode))}
                >Food ordered</button>
            );
        default:
            return null;
        }
    },

    render () {
        const {order} = this.props;

        const orderReady = () => order.id;

        return (
            <div>
                <div className="row">
                    <div className="col-xs-6">
                        <OrderDetails
                            cols={6}
                            order={order}
                        />
                    </div>
                    <div className="col-xs-6">
                        {this.renderActions()}
                    </div>
                </div>
                <div className="row">
                    {
                        orderReady() ?
                            (<div className="col-xs-6">
                                <Chat
                                    buildMessage={messageBuilderFactory.messageWithBadge('MANAGER')}
                                    orderId={order.id}
                                />
                            </div>) :
                            null
                    }
                </div>
            </div>
        );
    }
});

export default connect(
    state => ({
        order: state.activeOrder
    })
)(ManageOrder);
