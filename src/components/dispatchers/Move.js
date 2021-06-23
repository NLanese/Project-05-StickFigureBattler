import React, { Component } from 'react';
import { connect } from 'react-redux';
import { moveDispatcher } from '../../helpers/moveHelper';


const mapStateToProps = (state) => {
    return(
        {movesArray: state.battle.user.moves}
    )
}

const mapDispatchToProps = (dispatch) => {
    return({
            choosemove: (move) => dispatch(moveDispatcher(move))
        })
}

class Move extends Component{

    handleClick = (event) => {
        let indexofMove = event.tagret.offsetParent.id
        let selMove = this.props.movesArray[indexofMove]
        this.props.choosemove(selMove)
    }

    pow_or_heal(dmg){
        if (dmg >= 0){
            return "Damage Rating:"
        }
        else{
            return "Heal Rating:"
        }
    }

    render(){
        return(
            // get the index in as a prop from move container.
            // This way, we can access the battle.user.moves and find the move that way for the dispatch. 
            // Meaning, the event would track the id of the div it clicked, and then use that id as the index 
            // of the move in the user.moves array to send in the dispatch and figure out all the damage
            <div className={`MoveCard ${this.props.m.type}`} id={`MoveCard${this.props.index}`}>
                <p id="name">{this.props.m.name}</p>
                <p id="type">{this.props.m.type}</p>
                <p id="acc">Accuracy: {this.props.m.acc}</p>
                <p id="dmg">{this.pow_or_heal(this.props.m.dmg)} {this.props.m.dmg}</p>
                <p id="cool">Cooldown: {this.props.m.cool}</p>
            </div>
        )
    }

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Move)