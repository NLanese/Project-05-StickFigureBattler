import React, { Component } from 'react';
import { connect } from 'react-redux';
import FigureCard from '../functional/FigureCard.js';
import MovesContainer from './MovesContainer.js'
import MessageScreen from '../functional/MessageScreen.js';
import './BattleCard.css'

const mapStateToProps = (state) => {
    return { battle: state.battle }
}

function oppCard_or_genButton(battle){
    return(
      
    )
  }
}



class BattleCard extends Component{

  renderBattleCards = (props) => {
    console.log("Inside Battle Card")
    console.log(this.props.battle)
    let figuresArray = [null, null]
    let i = 0
    for (const fig in props.battle.figures){
      figuresArray[i] = props.battle.figures[fig]
      i = i + 1
    }
    i = 0
    return(
      <div className="BattleEnviro"> 
        <div className={`BattlerCard`} id={`user`} >                                      
          <div className= "Stat Card">
            <FigureCard info={props.user}/>
          </div>
          <div className= "Healthbar">
            <h3>Health: {props.battle.figures.user.hp}</h3>
            <p><strong>Current Status Effect: </strong>{props.battle.figures.user.status}</p>
          </div>
        </div>
        <div className={`BattlerCard`} id={`battle.figureopp`} >                                      
          <div className= "Stat Card">
            <FigureCard info={battle.figures.opp}/>
          </div>
          <div className= "Healthbar">
            <h3>Health: {props.battle.figures.opp.hp}</h3>
            <p><strong>Current Status Effect: </strong>{props.battle.figures.opp.status}</p>
          </div>
      </div>
    )
  }

  render_moves_or_messages = (props) => {
    if(props.battle_details.whoseTurn === "user"){
      <div className="MovesContainer">
        <MovesContainer movesList={props.user.moves}/>
      </div>
    }
    else{
      <div className="MessageContainer">
        <MessageScreen props={this.props.battle} />
      </div>
    }
  }

  render(){
    return(
    <div className={"BattleContainer"}>
      <div className= "FiguresContainer">
        {this.renderBattleCards(this.props)}
      </div>
    </div>
    )
  }
}

export default connect(
  mapStateToProps
  )(BattleCard)

