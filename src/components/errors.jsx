import React from 'react';
import {Row, Col, Alert} from 'react-bootstrap';
import {connect} from 'react-redux';
import {dismissError} from '../store/errorsActions';

const Errors = connect(state => ({
    errors: state.errors
}))(
    React.createClass({
        propTypes: {
            dispatch: React.PropTypes.func.isRequired,
            errors: React.PropTypes.array.isRequired
        },

        _renderErrors () {
            return this.props.errors.map(error => (
                <Alert
                    bsStyle="danger"
                    key={error.id}
                    onDismiss={this._dismiss.bind(null, error.id)}
                >
                    <strong>ERROR:</strong> {error.message}
                </Alert>)
            );
        },

        _dismiss (errorId) {
            this.props.dispatch(dismissError(errorId));
        },

        render () {
            return (
                <Row>
                    <Col xs={12}>
                        {this._renderErrors()}
                    </Col>
                </Row>
            );
        }
    })
);

export default Errors;
