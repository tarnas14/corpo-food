import React from 'react';
import {Col, Well} from 'react-bootstrap';

const OrderNotice = React.createClass({
    propTypes: {
        deliveryTime: React.PropTypes.string.isRequired,
        hungryGuysCount: React.PropTypes.number.isRequired,
        orderer: React.PropTypes.string.isRequired,
        restaurant: React.PropTypes.string.isRequired
    },

    render () {
        const hungryGuysCountStyles = {
            textAlign: 'right'
        };

        return (
            <Col className="OrderNotice" xs={3}>
                <Well>
                    <h3>{this.props.restaurant}</h3>
                    <p>Dedlajn {this.props.deliveryTime}</p>
                    <p>Fokusuje się {this.props.orderer}</p>
                    <p style={hungryGuysCountStyles}>{this.props.hungryGuysCount} os.</p>
                </Well>
            </Col>
        );
    }
});

export default OrderNotice;
