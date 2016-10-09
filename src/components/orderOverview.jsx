import React from 'react';
import {connect} from 'react-redux';

import {getOrder} from '../store/ordersActions';
import Chat from './chat';
import MealList from './mealList';
import SignUpForMeal from './signUpForMeal';
import OrderDetails from './orderDetails';
import messageBuilderFactory from './messageBuilderFactory';

const OrderOverview = React.createClass({
    propTypes: {
        dispatch: React.PropTypes.func.isRequired,
        order: React.PropTypes.object.isRequired,
        params: React.PropTypes.object.isRequired
    },

    componentDidMount () {
        this.props.dispatch(getOrder(this.props.params.id));
    },

    render () {
        const {order} = this.props;

        const orderReady = () => order.id;

        return (
            <div>
                <div className="row">
                    <div className="col-xs-6">
                        <OrderDetails
                            order={order}
                        />
                    </div>
                    {
                        orderReady() ?
                            (<div className="col-xs-6">
                                <MealList meals={order.meals} />
                                <SignUpForMeal />
                            </div>) :
                            null
                    }
                </div>
                {
                    orderReady() ?
                        (<div className="row">
                            <div className="col-xs-6">
                                <Chat
                                    buildMessage={messageBuilderFactory.regularMessage()}
                                    orderId={order.id}
                                />
                            </div>
                        </div>) :
                        null
                }
            </div>
        );
    }
});

export default connect(
    state => ({
        order: state.activeOrder
    })
)(OrderOverview);
