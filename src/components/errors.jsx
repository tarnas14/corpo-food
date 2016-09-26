import React from 'react';
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
                <div
                    key={error.id}
                    className="alert alert-danger alert-dismissable"
                >
                    <button
                        className="close"
                        onClick={this._dismiss.bind(null, error.id)}
                        tabIndex="-1"
                        type="button"
                    >
                        <span>×</span>
                    </button>
                    <strong>ERROR:</strong> {error.message}
                </div>)
            );
        },

        _dismiss (errorId) {
            this.props.dispatch(dismissError(errorId));
        },

        render () {
            return (
                <div className="row">
                    <div className="col-xs-12">
                        {this._renderErrors()}
                    </div>
                </div>
            );
        }
    })
);

export default Errors;
