import React from 'react';
import {Grid, Row, Col, PageHeader, Button} from 'react-bootstrap';
import {Link} from 'react-router';

import Dashboard from './dashboard';

const Index = React.createClass({
    render () {
        return (
            <Grid className="Index">
                <Row>
                    <Col xs={12}>
                        <PageHeader>Corpo food <small>orderuj food bez fakapu</small></PageHeader>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Link className="add-order-cta" to={'/newOrder'}>
                            <Button block bsSize="large" bsStyle="success">DODAJ ORDER</Button>
                        </Link>
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
