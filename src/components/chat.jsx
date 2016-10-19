import React from 'react';
import {connect} from 'react-redux';
import io from 'socket.io-client';

import {hydrateMessages, newMessage} from '../store/chatActions';
import SetUsername from './setUsername';
import {CLIENT_CONNECTED, JOIN_ROOM, ROOM_JOINED, CHAT_MESSAGE} from '../enums/chatMessageTypes';
import ChatMessages from './chatMessages';

const Chat = React.createClass({
    propTypes: {
        buildMessage: React.PropTypes.func.isRequired,
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
            const {buildMessage, user: {name: username}} = this.props;

            this.state.socket.emit(CHAT_MESSAGE, {...buildMessage(username, event.target.value), orderId: this.props.orderId});
            event.target.value = '';
        }
    },

    renderMessageInput () {
        return (
            <div className="form-group">
                <span className="input-group">
                    <span className="input-group-addon">Message:</span>
                    <input
                        className="form-control"
                        onKeyPress={this.sendMessage}
                        placeholder={`as ${this.props.user.name}`}
                        type="text"
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
                <ChatMessages chatMessages={chatMessages} />
                {userName ? this.renderMessageInput() : <SetUsername />}
            </div>
        );
    }
});

export default connect(
    state => ({chatMessages: state.chatMessages, user: state.user})
)(Chat);
