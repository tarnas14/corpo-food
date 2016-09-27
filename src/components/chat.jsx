import React from 'react';
import {connect} from 'react-redux';
import {hydrateMessages, newMessage} from '../store/chatActions';
import {setUsername, generateRandomUsername} from '../store/userActions';

import io from 'socket.io-client';
import {CLIENT_CONNECTED, JOIN_ROOM, ROOM_JOINED, CHAT_MESSAGE} from '../enums/chatMessageTypes';

const Chat = React.createClass({
    propTypes: {
        chatMessages: React.PropTypes.array.isRequired,
        dispatch: React.PropTypes.func.isRequired,
        orderId: React.PropTypes.string.isRequired,
        user: React.PropTypes.object.isRequired
    },

    getInitialState () {
        return {
            socket: io()
        };
    },

    componentDidMount () {
        const {socket} = this.state;

        socket.on(CLIENT_CONNECTED, () => {
            socket.emit(JOIN_ROOM, this.props.orderId);
        });
        socket.on(ROOM_JOINED, messages => {
            this.props.dispatch(hydrateMessages(messages));
        });
        socket.on(CHAT_MESSAGE, message => {
            this.props.dispatch(newMessage(message, this.props.orderId));
        });
    },

    sendMessage (event) {
        if (event.charCode === 13) {
            const message = {user: this.props.user.name, message: event.target.value};

            this.state.socket.emit(CHAT_MESSAGE, {...message, orderId: this.props.orderId});
            event.target.value = '';
        }
    },

    sendUsername (event) {
        if (event.charCode === 13) {
            const username = event.target.value;

            this.props.dispatch(setUsername(username));
            event.target.value = '';
        }
    },

    renderPromptForUsername () {
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
    },

    renderMessageInput () {
        return (
            <div className="form-group">
                <span className="input-group">
                    <span className="input-group-addon">Message:</span>
                    <input
                        className="form-control"
                        onKeyPress={this.sendMessage}
                        type="text"
                        placeholder={`as ${this.props.user.name}`}
                    />
                </span>
            </div>
        );
    },

    render () {
        const {chatMessages} = this.props;
        const {name: userName} = this.props.user;

        return (
            <div className="Chat">
                <h3>Chat</h3>
                <div
                    className="panel panel-default"
                    style={{
                        height: '400px',
                        overflowY: 'scroll'
                    }}
                    disabled={!userName}
                >
                    <div className="panel-body">
                        {chatMessages.map(
                            message => (
                                <div
                                    key={message._id}
                                    style={{margin: '0.5em 0'}}
                                >
                                    <span style={{fontWeight: 'bold'}}>{`${message.user}`}</span><br />
                                    <span>{`${message.message}`}</span>
                                </div>
                            )
                        )}
                    </div>
                </div>
                {userName ? this.renderMessageInput() : this.renderPromptForUsername()}
            </div>
        );
    }
});

export default connect(
    state => ({chatMessages: state.chatMessages, user: state.user})
)(Chat);
