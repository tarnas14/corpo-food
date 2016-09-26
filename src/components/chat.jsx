import React from 'react';
import {connect} from 'react-redux';
import {hydrateMessages, newMessage} from '../store/chatActions';

import io from 'socket.io-client';
import {CLIENT_CONNECTED, JOIN_ROOM, ROOM_JOINED, CHAT_MESSAGE} from '../enums/chatMessageTypes';

const randomUsernames = ['squirrel', 'cat', 'dog', 'horse', 'bird', 'hamster', 'snake', 'elephant', 'lion', 'panda'];

const Chat = React.createClass({
    propTypes: {
        chatMessages: React.PropTypes.array.isRequired,
        dispatch: React.PropTypes.func.isRequired,
        orderId: React.PropTypes.string.isRequired
    },

    getInitialState () {
        return {
            socket: io(),
            user: randomUsernames[Math.floor(Math.random() * randomUsernames.length)]
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
            const message = {user: this.state.user, message: event.target.value};

            this.state.socket.emit(CHAT_MESSAGE, {...message, orderId: this.props.orderId});
            event.target.value = '';
        }
    },

    render () {
        const {chatMessages} = this.props;
        return (
            <div>
                <h3>Chat</h3>
                <div
                    className="panel panel-default"
                    style={{
                        height: '400px',
                        overflowY: 'scroll'
                    }}
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
                <div className="form-group">
                    <span className="input-group">
                        <span className="input-group-addon">Message:</span>
                        <input
                            className="form-control"
                            onKeyPress={this.sendMessage}
                            type="text"
                        />
                    </span>
                </div>
            </div>
        );
    }
});

export default connect(
    state => ({chatMessages: state.chatMessages})
)(Chat);
