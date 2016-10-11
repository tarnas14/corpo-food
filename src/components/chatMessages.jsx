import React from 'react';

const ID = 'chat-messages';

export default React.createClass({
    propTypes: {
        chatMessages: React.PropTypes.array.isRequired
    },

    componentDidUpdate () {
        this.scrollToBottom();
    },

    scrollToBottom () {
        const messageContainer = document.getElementById(ID);
        messageContainer.scrollTop = messageContainer.scrollHeight;
    },

    render () {
        const {chatMessages} = this.props;

        return (
            <div
                className="panel panel-default"
                id={ID}
                style={{
                    height: '400px',
                    overflowY: 'scroll'
                }}
            >
                <div className="panel-body">
                    {chatMessages.map(message => (
                        <div
                            key={message._id}
                            style={{margin: '0.5em 0'}}
                        >
                            <span style={{fontWeight: 'bold'}}>{`${message.user}`}</span><br />
                            <span>{`${message.message}`}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
});

