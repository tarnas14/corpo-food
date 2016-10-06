import React from 'react';
import {connect} from 'react-redux';

import {getOrderForAdministration} from '../store/ordersActions';
import OrderDetails from './orderDetails';

const AdministerOrder = React.createClass({
    propTypes: {
        dispatch: React.PropTypes.func.isRequired,
        order: React.PropTypes.object.isRequired,
        params: React.PropTypes.object.isRequired
    },

    componentDidMount () {
        this.props.dispatch(getOrderForAdministration(this.props.params.adminId));
    },

    render () {
        const {params: {adminId}, order} = this.props;

        return (
            <div className="row">
                <OrderDetails
                    cols={12}
                    order={order}
                />
            </div>
        );
    }
});

export default connect(
    state => ({
        order: state.activeOrder
    })
)(AdministerOrder);
