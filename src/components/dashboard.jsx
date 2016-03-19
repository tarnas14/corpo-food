import React from 'react';
import {Row, Alert} from 'react-bootstrap';
import OrderNotice from './orderNotice';
import {connect} from 'react-redux';
import {hydrateOrderNotices} from '../store/orderNoticesActions';

const Dashboard = React.createClass({
    propTypes: {
        dispatch: React.PropTypes.func.isRequired,
        orderNotices: React.PropTypes.array.isRequired
    },

    componentWillMount () {
        const mockedOrderNotices = [
            {
                id: 1,
                restaurant: 'hello',
                deliveryTime: new Date(),
                orderer: 'Andrzej',
                hungryGuysCount: 4
            },
            {
                id: 2,
                restaurant: 'this is not today',
                deliveryTime: new Date(2010, 10, 11, 12, 12, 12),
                orderer: 'Elo',
                hungryGuysCount: 2
            }
        ];

        const orderNotices = mockedOrderNotices;

        const noticesToday = orderNotices.filter((orderNotice) => {
            const today = new Date();
            return today.getFullYear() === orderNotice.deliveryTime.getFullYear() &&
                today.getMonth() === orderNotice.deliveryTime.getMonth() &&
                today.getDate() === orderNotice.deliveryTime.getDate();
        });

        this.props.dispatch(hydrateOrderNotices(noticesToday));
    },

    _renderOrderNotices () {
        return this.props.orderNotices.map((orderNotice) => {
            return <OrderNotice key={orderNotice.id} {...orderNotice} />;
        });
    },

    _getDashboardStyles () {
        return {
            marginTop: '1em'
        };
    },

    render () {
        const noNoticesYet = this.props.orderNotices.length ?
            null : <Alert bsStyle="warning">Nikt jeszcze nie sfokusował się na czelendża - bądź pierwszy</Alert>;

        return (
            <div className="Dashboard" style={this._getDashboardStyles()}>
                {noNoticesYet}
                <Row>
                    {this._renderOrderNotices()}
                </Row>
            </div>
        );
    }
});

const ConnectedDashboard = connect(
    (state) => ({orderNotices: state.orderNotices})
)(Dashboard);

export default ConnectedDashboard;
