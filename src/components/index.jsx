import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

const Index = React.createClass({
    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <h1>Corpo food <small>orderuj food bez fakapu</small></h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        Grid here.
                    </Col>
                </Row>
            </Grid>
        )
    }
});

export default Index;