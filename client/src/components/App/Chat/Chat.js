import React, { Component } from 'react';

class LeftSidebar extends Component {

    render() {
        return (
            <div className="chat-container">
                <div className="chat-title">Chat</div>
                <div className="chat-window">
                    <div className="chat-from">From:</div>
                    <div className="chat-to">To:</div>
                    <div className="message">Message:</div>
                </div>
            </div>
        );
    }
}

export default LeftSidebar;