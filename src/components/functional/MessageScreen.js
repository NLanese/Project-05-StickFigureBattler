import React, { Component } from 'react';
import './MessageScreen.css'
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
    return({
        continue: () => dispatch({type: 'MOVE_PROCESS_COMPLETE'})
    })
}


class MessageScreen extends Component{ 

    makeMessageDivs(props){
        let promptArray = props.prompts.split("|")
        promptArray = promptArray.slice(0, promptArray.length - 1)
        return promptArray.map( (msg, index) => {
            return(
                <p className="msg" key={index}>{msg}</p>
            )
        })
    }
    render(){
        return(
            <div className="MessageScreen">
                <div className="Actual">{this.makeMessageDivs(this.props)}</div>
                <button className="continue" onClick={() => this.props.continue()}>Continue</button>
            </div>
        )
    }
}

export default connect(
    null,
    mapDispatchToProps
)(MessageScreen)