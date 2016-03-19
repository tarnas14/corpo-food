import React from 'react';
import {Grid, Row, Col, PageHeader} from 'react-bootstrap';

import Dashboard from './dashboardComponent';

const Index = React.createClass({
    _getOrderNotices () {
        return [
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
                        <Dashboard orderNotices={this._getOrderNotices()} />
                    </Col>
                </Row>
            </Grid>
        );
    }
});

export default Index;
