import React from 'react';
import {Grid, Row} from 'react-bootstrap';
import OrderNotice from './orderNoticeComponent';

const Dashboard = React.createClass({
    propTypes: {
        orderNotices: React.PropTypes.array.isRequired
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

export default Dashboard;
