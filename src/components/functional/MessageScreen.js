import React, { Component } from 'react';
import './MessageScreen.css'
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
    return({
        continue: (props) => {
            if (props.statusHandled == true){
                dispatch({type: 'TURN_COMPLETE'})
            }
            else{
                dispatch({type: 'STATUS_PROCESS'})
            }
        }
    })
}

const mapStateToProps = (state) => {
    return({
        prompts: state.battle.prompt,
        statusHandled: state.battle.statusHandled
    })
}


class MessageScreen extends Component{ 

   handleClick = (props) => {
       return this.props.continue(props)
   }

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
                <button className="continue" onClick={() => this.handleClick(this.props)}>Continue</button>
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MessageScreen)