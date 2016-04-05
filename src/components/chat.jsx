import React from 'react';
import {connect} from 'react-redux';
import {getMessages} from '../store/chatActions';

import io from 'socket.io-client';
import {ChatMessage} from '../enums/chatMessageTypes';

const Chat = React.createClass({
    propTypes: {
        chatMessages: React.PropTypes.array.isRequired,
        orderId: React.PropTypes.string.isRequired
    },

    componentDidMount () {
        const socket = io();

        this.props.dispatch(getMessages(this.props.orderId));
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
