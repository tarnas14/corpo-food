import React from 'react';
import {Col, Well} from 'react-bootstrap';

const OrderTile = React.createClass({
    propTypes: {
        deliveryTime: React.PropTypes.object.isRequired,
        hungryGuysCount: React.PropTypes.number.isRequired,
        author: React.PropTypes.string.isRequired,
        restaurant: React.PropTypes.string.isRequired
    },

    _dateToString (date) {
        const minutes = date.getMinutes().toString().length === 1 ? '0' + date.getMinutes() : date.getMinutes();

        return `${date.getHours()}:${minutes}`;
    },

    render () {
        const hungryGuysCountStyles = {
            textAlign: 'right'
        };

        return (
            <Col className="OrderTile" xs={3}>
                <Well>
                    <h3>{this.props.restaurant}</h3>
                    <p>Dedlajn: {this._dateToString(this.props.deliveryTime)}</p>
                    <p>Fokusuje się: {this.props.author}</p>
                    <p style={hungryGuysCountStyles}>zamówiły już {this.props.hungryGuysCount} os.</p>
                </Well>
            </Col>
        );
    }
});

export default OrderTile;
