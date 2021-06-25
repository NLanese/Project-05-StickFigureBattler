import React, { Component } from 'react';
import { connect } from 'react-redux';
import makeOppMoveSelection from '../../helpers/oppMoveSelection';
import { moveAction } from '../../helpers/moveHelper';
import './Move.css'

// PROPS MEHTODS
// Props = 
    // props.movesArray -> An array of all the user's moves from the state
    // props.useMove -> Dispatcher that takes a move as an input
const mapStateToProps = (state) => {
    return(
        {battle: state.battle}
    )
}
const mapDispatchToProps = (dispatch) => {
    return({
            chooseMove: (move, props) => processMoves(move, props),
            executeMove: (move, attacker) => dispatch(moveAction(move, attacker)),
            initiateMoveProcess: () => dispatch({type: 'MOVE_SELECTED'}),
            completeMoveprocess: () => dispatch({type: 'MOVE_PROCESS_COMPLETE'})
        })
}
// PROPS METHODS



// This will handle everything battle related after move selection. This includes...
    // 1. Accepts the selected move from the User
    // 2. Selects a move from the Opponent's available moves
    // 3. Determines if they are shocked, they move last
    // 4. Determines if any move has 'move first' effect, if so that move goes first
    // 5. Compares speed to determine which move goes first
    // 6. If any figure has 0 health after any move, the battle ends
    // 7. After the moves are executed, applies any damage from status effects
function processMoves(moveObj, props){
    // Assigns global values
    let opp = props.battle.opp
    let user = props.battle.user

    // Selects a move that the opponent uses
    let oppMoveObj = makeOppMoveSelection(opp)

    // Removes the move selection screen for the message screen
    props.initiateMoveProcess()

    // If someone is using a move that moves first
    if (moveObj.effect == "move first" && oppMoveObj.effect != "move first"){
        props.executeMove(moveObj, "user")
        setTimeout( () => { console.log("Woo we made it!") }, 10000)
        props.executeMove(oppMoveObj, "opp")
    }
    else if (oppMoveObj.effect == "move first" && moveObj.effect != "move first"){
        props.executeMove(moveObj, "opp")
        setTimeout( () => { console.log("Woo we made it!") }, 10000)
        props.executeMove(oppMoveObj, "user")
    }

    // If someone is shocked the other goes first
    else if (opp.status == "shocked" && user.status != "shocked"){
        props.executeMove(moveObj, "user")
        setTimeout( () => { console.log("Woo we made it!") }, 10000)
        props.executeMove(oppMoveObj, "opp")
    }
    else if (opp.status != "shocked" && user.status == "shocked"){
        props.executeMove(moveObj, "opp")
        setTimeout( () => { console.log("Woo we made it!") }, 10000)
        props.executeMove(oppMoveObj, "user")
    }

    // Handles everything else
    else{
        if (user.spd >= opp.spd){
            props.executeMove(moveObj, "user")
            setTimeout( () => { console.log("Woo we made it!") }, 10000)
            props.executeMove(oppMoveObj, "opp")
        }
        else{
            props.executeMove(moveObj, "opp")
            setTimeout( () => { console.log("Woo we made it!") }, 10000)
            props.executeMove(oppMoveObj, "user")
        }
    }
}

class Move extends Component{


    handleClick = (event, props) => {
        let indexofMove = parseInt((event.target.offsetParent.id.split("e")[1]), 10)
        let selMove = this.props.battle.opp.moves[indexofMove]
        this.props.chooseMove(selMove, props)
    }

    // Will create a prompt that displays whether the move is damaging or healing
    pow_or_heal(dmg){
        if (dmg >= 0){
            return "Damage Rating:"
        }
        else{
            return "Heal Rating:"
        }
    }

    alterClassNameBasedOnCoolDown(props){
        if (props.m.tillCooldown > 0){
            return "cooling"
        }
        else{
            return "ready"
        }
    }

    render(){
        return(
            // get the index in as a prop from move container.
            // This way, we can access the battle.user.moves and find the move that way for the dispatch. 
            // Meaning, the event would track the id of the div it clicked, and then use that id as the index 
            // of the move in the user.moves array to send in the dispatch and figure out all the damage
            <div className={`MoveCard ${this.alterClassNameBasedOnCoolDown(this.props)}`} id={`MoveCard${this.props.index}`}
                onClick = {(event) => this.handleClick(event, this.props)}>
                <p id="name">{this.props.m.name}</p>
                <p id="type">Type: {this.props.m.type}</p>
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