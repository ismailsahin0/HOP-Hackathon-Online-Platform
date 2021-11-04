import React, { Component } from 'react';
import './PrivateChat.css';

class PrivateChat extends Component {


    render() {
        var url = "http://localhost:3000/?username="+localStorage.getItem("username");
        return (
            // eslint-disable-next-line
            <iframe src={url} position="absolute" height="1000px" width="100%" ></iframe>

        );
    }
}

export default PrivateChat;