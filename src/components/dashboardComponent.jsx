import React from 'react';
import {Grid, Row} from 'react-bootstrap';
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
                deliveryTime: '15:00',
                orderer: 'Andrzej',
                hungryGuysCount: 4
            },
            {
                id: 2,
                restaurant: 'world',
                deliveryTime: '12:00',
                orderer: 'Elo',
                hungryGuysCount: 2
            }
        ];

        this.props.dispatch(hydrateOrderNotices(mockedOrderNotices));
    },

    _renderOrderNotices () {
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
