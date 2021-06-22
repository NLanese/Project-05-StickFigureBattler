import React, { Component } from 'react';
import { connect } from 'react-redux';
import figures from '../../helpers/list_of_figures';
import BioCard from '../functional/BioCard';
import './Confirm.css'
import { KnightMoves, PirateMoves, MartianMoves, MadScientistMoves, RobotMoves } from '../../helpers/when_moves_can_be_learned';

// ACTION OBJECTS - BELOW //
function confirm(figureObj){
    let moves = [null, null, null, null]
    let name = figureObj.name
        if (name == "Knight"){
             moves = KnightMoves.one
        }
        else if (name == "Mad Scientist"){
            moves = MadScientistMoves.one
        }
        else if (name == "Martian"){
            moves = MartianMoves.one
        }
        else if (name == "Pirate"){
            moves = PirateMoves.one
        }
        else if (name == "Robot"){
            moves = RobotMoves.one
        }
    return (dispatch) => {
        let figure = figureObj
        dispatch({type: 'LOAD_FIGURE'})
        let movesLen = moves.length // Going to be either 2 or 3
        if (movesLen == 2){
            let move1 = null
            let move2 = null
            fetch(`http://localhost:3000/moves/${moves[0]}`)   // Generate first move
                .then(resp => resp.json())  
                .then(json => {
                    move1 = {
                        name: json.name,
                        type: json.class_type,
                        dmg: json.damage_rating,
                        acc: json.acc,
                        cool: json.cooldown,
                        dmg_type: json.damage_type,
                        desc: json.description,
                        effect: json.effect,
                    }
                })    // make this functional later
                .then(fetch(`http://localhost:3000/moves/${moves[1]}`)
                    .then(resp => resp.json())
                    .then(json => {
                        move2 = {
                            name: json.name,
                            type: json.class_type,
                            dmg: json.damage_rating,
                            acc: json.acc,
                            cool: json.cooldown,
                            dmg_type: json.damage_type,
                            desc: json.description,
                            effect: json.effect,
                        }
                    })
                    .then( () => {
                        let payloadMoves = [move1, move2]
                        figure.moves = payloadMoves
                        dispatch({type: 'CREATE_USER_FIGURE', payload: figure})
                    })
                )
        }
        else{
            let move1 = null
            let move2 = null
            let move3 = null
            fetch(`http://localhost:3000/moves/${moves[0]}`)   // Generate first move
                .then(resp => resp.json())  
                .then(json => {
                    move1 = {
                        name: json.name,
                        type: json.class_type,
                        dmg: json.damage_rating,
                        acc: json.acc,
                        cool: json.cooldown,
                        dmg_type: json.damage_type,
                        desc: json.description,
                        effect: json.effect,
                    }
                })    // make this functional later
                .then(fetch(`http://localhost:3000/moves/${moves[1]}`)
                    .then(resp => resp.json())
                    .then(json => {
                        move2 = {
                            name: json.name,
                            type: json.class_type,
                            dmg: json.damage_rating,
                            acc: json.acc,
                            cool: json.cooldown,
                            dmg_type: json.damage_type,
                            desc: json.description,
                            effect: json.effect,
                        }
                    })
                )
                .then(fetch(`http://localhost:3000/moves/${moves[2]}`)
                .then(resp => resp.json())
                .then(json => {
                    move2 = {
                        name: json.name,
                        type: json.class_type,
                        dmg: json.damage_rating,
                        acc: json.acc,
                        cool: json.cooldown,
                        dmg_type: json.damage_type,
                        desc: json.description,
                        effect: json.effect,
                    }
                })
                .then( () => {
                    let payloadMoves = [move1, move2, move3]
                    figure.moves = payloadMoves
                    dispatch({type: 'CREATE_USER_FIGURE', payload: figure})
                })
            )
        }
    }
}
// ACTION OBJECTS - ABOVE //

const mapDispatchToProps = (dispatch) => {
    return ({
        confirmFigure: (figure) => dispatch(confirm(figure)),
        unSelect: () => dispatch({type: 'DESELECT'})
    })
}

class Confirm extends Component{

    findHero = (props) => {
        for (const figure in figures){
            if (figures[figure].name === props.figure){
                return figures[figure]
            }
        }
    }

    render(){
        return(
            <div className="ConfirmBox">
                <h3 id="confirmation">Confirm This Character?</h3>
                <div className="SelectedFigure">
                    <BioCard hero={this.findHero(this.props)} />
                </div>
                <button id="yes" onClick={() => this.props.confirmFigure(this.findHero(this.props))}>Yes!</button> 
                <button id="no" onClick={() => this.props.unSelect()}>No!</button>
            </div>
        )
    }
}

export default connect(
    null,
    mapDispatchToProps
)(Confirm)