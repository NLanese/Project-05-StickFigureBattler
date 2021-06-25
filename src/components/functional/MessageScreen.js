import React from 'react';
import './MessageScreen.css'

const MessageScreen = (props) => {

    function makeMessageDivs(props){
        let promptArray = props.prompts.split("|")
        promptArray = promptArray.map( (msg) => {
            if (msg.length > 10){
                return msg
            }
        })
        return promptArray.map( (msg, index) => {
            return(
                <p className="msg" key={index}>{msg}</p>
            )
        })
    }

    return(
        <div className="MessageScreen">
            <div className="Actual">{makeMessageDivs(props)}</div>
        </div>
    )
}

export default MessageScreen