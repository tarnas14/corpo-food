import React from 'react';
import {Grid, Row, Well} from 'react-bootstrap';
import OrderNotice from './orderNoticeComponent';
import {connect} from 'react-redux';
import {hydrateOrderNotices} from '../store/orderNotices';

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
        if (!this.props.orderNotices.length) {
            return <Well>Nikt jeszcze nie sfokusował się na czelendża - bądź pierwszy</Well>;
        }

        return this.props.orderNotices.map((orderNotice) => {
            return <OrderNotice key={orderNotice.id} {...orderNotice} />;
        });
    },

    render () {
        return (
            <Grid className="Dashboard">
                <Row>
                    {this._renderOrderNotices()}
                </Row>
            </Grid>
        );
    }
});

const ConnectedDashboard = connect(
    (state) => ({orderNotices: state.orderNotices})
)(Dashboard);

export default ConnectedDashboard;
