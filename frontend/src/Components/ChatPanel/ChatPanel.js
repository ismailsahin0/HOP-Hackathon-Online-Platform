import React, { Component } from 'react';
import './ChatPanel.css';

class ChatPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [
                {
                    messageText: 'Selam',
                    date: '',
                    isSentByMe: true
                },
                {
                    messageText: 'Naber',
                    date: '',
                    isSentByMe: true
                },
                {
                    messageText: 'Iyidir, senden?',
                    date: '',
                    isSentByMe: false
                }
            ]
        };
        this.getMessages = this.getMessages.bind(this);
    }

    getMessages() {
        const messages = [];
        this.state.messages.forEach(message => {
            const rowClass = message.isSentByMe ? 'message-row right-align': 'message-row left-align';
            const boxClass = message.isSentByMe ? 'my-message-box' : 'other-message-box';
            messages.push(
                <div className={rowClass}>
                    <div className={boxClass}>
                        {message.messageText}
                    </div>
                </div>
            )
        });
        return messages;
    }

    render() {
        return (
            <div className="messages-panel">
                {this.getMessages()}
            </div>
        );
    }
}

export default ChatPanel;