import React, { Component } from 'react';

const MessageScreen = (props) => {
    return(
        <div className="Message Content">
            <h3>{props.battle_details.prompt}</h3>
        </div>
    )
}

export default MessageScreen