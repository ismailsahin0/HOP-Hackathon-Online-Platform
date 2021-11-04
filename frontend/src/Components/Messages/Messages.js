import React, { Component } from 'react';
import './Messages.css';
import ChatPanel from "../ChatPanel/ChatPanel";

class Messages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            conversations: [
                {
                    otherUser: 'Betul Gokbel',
                },
                {
                    otherUser: 'Mahir Bastas',
                },
                {
                    otherUser: 'Ismail Sahin',
                }
            ]
        };
        this.getConversations = this.getConversations.bind(this);
    }

    getConversations() {
        return (
            this.state.conversations.map(c => {
                return (
                    <option value={c.otherUser}  className="conversation">
                        {c.otherUser}
                    </option>
                )
            })
        )
    }

    render() {
        return (
            <div className="messages-panel">
                <div className="conversations-panel">
                    <h2>Conversations</h2>
                    <select name="cars" id="cars">
                        {this.getConversations()}
                    </select>
                </div>
                <div>
                    <ChatPanel />
                </div>
            </div>
        );
    }
}

export default Messages;