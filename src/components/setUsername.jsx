import React from 'react';
import {connect} from 'react-redux';
import {setUsername, generateRandomUsername} from '../store/userActions';

const SetUsername = React.createClass({
    propTypes: {
        dispatch: React.PropTypes.func.isRequired,
        resources: React.PropTypes.object.isRequired
    },

    sendUsername (event) {
        if (event.charCode === 13) {
            const username = event.target.value;

            this.props.dispatch(setUsername(username));
            event.target.value = '';
        }
    },

    render () {
        const {resources} = this.props;

        return (
            <div className="form-group">
                <span className="input-group">
                    <span className="input-group-addon">{resources.username}</span>
                    <input
                        className="form-control"
                        onKeyPress={this.sendUsername}
                        placeholder={resources.provideUsername}
                        type="text"
                    />
                    <span className="input-group-btn" >
                        <button
                            className="btn btn-secondary"
                            onClick={() => this.props.dispatch(generateRandomUsername())}
                        >
                            {resources.randomUsername}
                        </button>
                    </span>
                </span>
            </div>
        );
    }
});

export default connect(
    state => ({resources: state.localization.resources.setUsername})
)(SetUsername);
