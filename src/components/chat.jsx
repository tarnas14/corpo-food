import React from 'react';
import {connect} from 'react-redux';
import {hydrateMessages} from '../store/chatActions';

import io from 'socket.io-client';
import {CLIENT_CONNECTED, JOIN_ROOM, ROOM_JOINED} from '../enums/chatMessageTypes';

const Chat = React.createClass({
    propTypes: {
        chatMessages: React.PropTypes.array.isRequired,
        dispatch: React.PropTypes.func.isRequired,
        orderId: React.PropTypes.string.isRequired
    },

    componentDidMount () {
        const socket = io();
        socket.on(CLIENT_CONNECTED, () => {
            socket.emit(JOIN_ROOM, this.props.orderId);
        });
        socket.on(ROOM_JOINED, (messages) => {
            this.props.dispatch(hydrateMessages(messages));
        });

        //socket.on(ChatMessage, message => {
        //    console.log('chat message:', message);
        //});
        //socket.emit(ChatMessage, 'hello!');
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
            </div>
        );
    }
});

export default connect(
    state => ({chatMessages: state.chatMessages})
)(Chat);
