import React, { Component } from 'react'
import { KnightMoves, MadScientistMoves, MartianMoves, PirateMoves, RobotMoves } from '../../helpers/when_moves_can_be_learned'
import { connect } from 'react-redux'
import getImage from '../../helpers/getImage'
import './LevelUp.css'
import { when } from 'q'



const DOMAIN = "http://localhost:3000/"

const mapStateToProps = (state) => {
    return { battle: state.battle,
             user: state.user }
}

const mapDispatchToProps = (dispatch) => {
    return({
        completeStats: (state, props) => {
            if (state.incRemaining > 0){
                return
            }
            else{
                dispatch({type: `LOAD_FIGURE`})
                let whenMoveAreLearned = null
                let movesName = props.user.title
                if (movesName == "Knight"){
                    whenMoveAreLearned = KnightMoves
                }
                else if (movesName == "Mad Scientist"){
                    whenMoveAreLearned = MadScientistMoves
                }
                else if (movesName == "Martian"){
                    whenMoveAreLearned = MartianMoves
                }
                else if (movesName == "Pirate"){
                    whenMoveAreLearned = PirateMoves
                }
                else if (movesName == "Robot"){
                    whenMoveAreLearned = RobotMoves
                }
                let newMovesArray = []
                if (props.user.level + 1 == 2){
                    newMovesArray = whenMoveAreLearned.two
                }
                else if (props.user.level + 1 == 3){
                    newMovesArray = whenMoveAreLearned.three   
                }
                else if (props.user.level + 1 == 4){
                    newMovesArray = whenMoveAreLearned.four  
                }
                let len = newMovesArray.length
                if (len == 1){
                    let newMoves = [null]
                    fetch(DOMAIN + `moves/${newMovesArray[0]}`)
                        .then(resp => resp.json())
                        .then(json => {
                            newMoves[0] = json
                            return newMoves
                        })
                        .then((newMoves) => dispatch({type: 'COMPLETE_STAT_UP', payload: state, moves: newMoves}))
                }
                else{
                    let newMoves = [null, null]
                    fetch(DOMAIN + `moves/${newMovesArray[0]}`)
                        .then(resp => resp.json())
                        .then(json => {
                            newMoves[0] = json
                            return
                        })
                        .then( () => fetch(DOMAIN + `moves/${newMovesArray[1]}`))
                            .then(resp => resp.json())
                            .then(json => {
                                console.log("passed the debugger")
                                newMoves[1] = json
                                return newMoves
                            })
                            .then((newMoves) => {
                                dispatch({type: 'COMPLETE_STAT_UP', payload: state, moves: newMoves})
                            })
                }
            }
        },
        submit: newUser => dispatch({type: 'COMPLETE_LEVEL_UP', payload: newUser}) 
    })
}

class LevelUp extends Component{
    
    determineInc(stat){
        return (parseInt( (stat / 6), 10) )
    }

    constructor(props){
        super(props)
        this.state = {
            incRemaining: (props.user.level + 1) * 3,
            remRemaining: 0,
            atkBoost: 0,
            defBoost: 0,
            sAtkBoost: 0,
            sDefBoost: 0,
            hpBoost: 0,
            spdBoost: 0,
            selectedMove: 0
        }
    }

    handleIncClick = (event) => {
        let stat= ""

        if (this.state.incRemaining == 0){
            return
        }
        else{
            stat = event.target.className.split("_")[1]
            console.log(stat)
        }

        if (stat == ("sDef")){
            this.setState({
                ...this.state, sDefBoost: this.state.sDefBoost += 1, incRemaining: this.state.incRemaining - 1, remRemaining: this.state.remRemaining + 1
            })
        }
        else if (stat == ("sAtk")){
            this.setState({
                ...this.state, sAtkBoost: this.state.sAtkBoost += 1, incRemaining: this.state.incRemaining - 1, remRemaining: this.state.remRemaining + 1
            })
        }
        else if (stat == ("def")){
            this.setState({
                ...this.state, defBoost: this.state.defBoost += 1, incRemaining: this.state.incRemaining - 1, remRemaining: this.state.remRemaining + 1
            })
        }
        else if (stat == ("atk")){
            console.log("inside inc atk")
            this.setState({
                ...this.state, atkBoost: this.state.atkBoost += 1, incRemaining: this.state.incRemaining - 1, remRemaining: this.state.remRemaining + 1
            })
            console.log(this.state)
        }
        this.setState(
            {...this.state, incRemaining: this.state.incRemaining - 1, remRemaining: this.state.remRemaining + 1}
        )
        return
    }
    handleRemClick = (event) => {
        let stat= ""

        if (this.state.remRemaining == 0){
            return
        }
        else{
            stat = event.target.className.split("_")[1]
        }

        if (stat == ("sDef")){
            this.setState({
                ...this.state, sDefBoost: this.state.sDefBoost -= 1
            })
        }
        else if (stat == ("sAtk")){
            this.setState({
                ...this.state, sAtkBoost: this.state.sAtkBoost -= 1
            })
        }
        else if (stat == ("def")){
            this.setState({
                ...this.state, defBoost: this.state.defBoost -= 1
            })
        }
        else if (stat == ("atk")){
            this.setState({
                ...this.state, atkBoost: this.state.atkBoost -= 1
            })
        }
        this.setState(
            {...this.state, incRemaining: this.state.incRemaining + 1, remRemaining: this.state.remRemaining - 1}
        )
    }
    handleStatSubmit = () => {
        this.props.completeStats(this.state, this.props)
    }

    render(){
        return(
            <div className="Figure Card"> 
                <div className="Figure Image">
                    {getImage(this.props.user.title)}
                </div>
                <div className="FigureStats">
                    <p>
                        Attack: {this.props.user.atk} <strong classname="StatIncAtk"> + {(this.determineInc(this.props.user.atk) + this.state.atkBoost)} </strong>
                        <button className="Add_atk" onClick = {(event) => this.handleIncClick(event)} >Add</button>
                        <button className="Rem_atk" onClick = {(event) => this.handleRemClick(event)} >Remove</button>
                    </p>
                    <p>
                        Defense: {this.props.user.def} <strong classname="StatIncDef"> + {(this.determineInc(this.props.user.def) + this.state.defBoost)} </strong>
                        <button className="Add_def" onClick = {(event) => this.handleIncClick(event)} >Add</button>
                        <button className="Rem_def" onClick = {(event) => this.handleRemClick(event)} >Remove</button>
                    </p>
                    <p>
                        Special Attack: {this.props.user.sAtk} <strong classname="StatIncSAtk"> + {(this.determineInc(this.props.user.sAtk) + this.state.sAtkBoost)} </strong>
                        <button className="Add_sAtk" onClick = {(event) => this.handleIncClick(event)} >Add</button>
                        <button className="Rem_sAtk" onClick = {(event) => this.handleRemClick(event)} >Remove</button>
                    </p>
                    <p>
                        Special Defense: {this.props.user.sDef} <strong classname="StatIncSDef"> + {(this.determineInc(this.props.user.sDef) + this.state.sDefBoost)} </strong>
                        <button className="Add_sDef" onClick = {(event) => this.handleIncClick(event)} >Add</button>
                        <button className="Rem_sDef" onClick = {(event) => this.handleRemClick(event)} >Remove</button>
                    </p>
                    <p>Max HP: {this.props.user.hp} <strong classname="StatIncHP"> + {this.determineInc(this.props.user.hp)}</strong></p>
                    <p>Speed: {this.props.user.spd} <strong classname="StatIncSpd"> + {this.determineInc(this.props.user.spd)}</strong></p>
                    <h3 className="PointsLeft">{this.state.incRemaining} Upgrade Points Left!</h3>
                    <button className="SubmitStats" onClick={() => this.handleStatSubmit()}>Confirm Stat Changes</button>
                </div>
            </div>       
        )
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(LevelUp)