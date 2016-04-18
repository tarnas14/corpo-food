import React from 'react';
import {connect} from 'react-redux';
import {hydrateMessages, sendMessage} from '../store/chatActions';

import io from 'socket.io-client';
import {CLIENT_CONNECTED, JOIN_ROOM, ROOM_JOINED, CHAT_MESSAGE} from '../enums/chatMessageTypes';

const Chat = React.createClass({
    propTypes: {
        chatMessages: React.PropTypes.array.isRequired,
        dispatch: React.PropTypes.func.isRequired,
        orderId: React.PropTypes.string.isRequired
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
            this.props.dispatch(sendMessage(message, this.props.orderId));
        });
    },

    sendMessage (event) {
        if (event.charCode === 13) {
            const message = {user: 'random squirrel', message: event.target.value};

            this.state.socket.emit(CHAT_MESSAGE, {...message, orderId: this.props.orderId});
            this.props.dispatch(sendMessage(message, this.props.orderId));
            this.textfield.value = '';
        }
    },

    render () {
        const {chatMessages} = this.props;
        return (
            <div>
                {chatMessages.map(
                    message => (
                        <div key={`${message.user}${message.message}`}>
                            {`${message.user}:`}<br />
                            {`${message.message}`}
                        </div>
                    )
                )}
                <input
                    onKeyPress={this.sendMessage}
                    ref={ref => (this.textfield = ref)}
                    type="text"
                />
            </div>
        );
    }
});

export default connect(
    state => ({chatMessages: state.chatMessages})
)(Chat);
