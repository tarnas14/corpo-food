import React from 'react';
import {Grid, Row, Col, PageHeader} from 'react-bootstrap';

import Dashboard from './dashboardComponent';

const Index = React.createClass({
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
                        <Dashboard />
                    </Col>
                </Row>
            </Grid>
        );
    }
});

export default Index;
