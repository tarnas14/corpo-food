import React from 'react';
import {connect} from 'react-redux';
import {setUsername, generateRandomUsername} from '../store/userActions';

const SetUsername = React.createClass({
    propTypes: {
        dispatch: React.PropTypes.func.isRequired
    },

    sendUsername (event) {
        if (event.charCode === 13) {
            const username = event.target.value;

            this.props.dispatch(setUsername(username));
            event.target.value = '';
        }
    },

    render () {
        return (
            <div className="form-group">
                <span className="input-group">
                    <span className="input-group-addon">Username:</span>
                    <input
                        className="form-control"
                        onKeyPress={this.sendUsername}
                        type="text"
                        placeholder="provide username to use chat"
                    />
                    <span className="input-group-btn" >
                        <button
                            className="btn btn-secondary"
                            onClick={() => this.props.dispatch(generateRandomUsername())}
                        >
                            RANDOM
                        </button>
                    </span>
                </span>
            </div>
        );
    }
});

export default connect()(SetUsername);
