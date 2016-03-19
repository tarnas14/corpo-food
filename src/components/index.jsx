import React from 'react';
import {connect} from 'react-redux';
import {hydrateOrderNotices} from '../store/orderNotices';
import {Grid, Row, Col, PageHeader} from 'react-bootstrap';

import Dashboard from './dashboardComponent';

const Index = React.createClass({
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

    render () {
        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <PageHeader>Corpo food <small>orderuj food bez fakapu</small></PageHeader>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Dashboard orderNotices={this.props.orderNotices} />
                    </Col>
                </Row>
            </Grid>
        );
    }
});

const ConnectedIndex = connect(
    (state) => ({orderNotices: state.orderNotices})
)(Index);

export default ConnectedIndex;
