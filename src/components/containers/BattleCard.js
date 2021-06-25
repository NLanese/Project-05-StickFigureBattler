import React, { Component } from 'react';
import { connect } from 'react-redux';
import FigureCard from '../functional/FigureCard.js';
import MovesContainer from './MovesContainer.js'
import MessageScreen from '../functional/MessageScreen.js';
import './BattleCard.css'

const mapStateToProps = (state) => {
    return { battle: state.battle,
             user: state.user }
}




class BattleCard extends Component{

  renderBattleCards = (props) => {
    console.log("Inside Battle Card, the battle state is as follows...")
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
              <h3>Health: {props.battle.user.hp} / {props.user.hp}</h3>
              <p><strong>Current Status Effect: </strong>{props.battle.user.status}</p>
            </div>
        </div>

        <div className={`BattlerCard`} id={`opp`} >                                      
            <div className= "Stat Card">
              <FigureCard info={props.battle.opp}/>
            </div>
            <div className= "Healthbar">
              <h3>Health: {props.battle.opp.hp}</h3>
              <p><strong>Current Status Effect: </strong>{props.battle.opp.status}</p>
            </div>
        </div>

        <div className="DynamicDisplay">
          {this.render_moves_or_messages(props)}        
        </div> 

      </div>
      )
  }

  render_moves_or_messages = (props) => {
    if(props.battle.move_selection === true){
      console.log("Inside BattleCard")
      console.log(props.user.moves)
      return(
        <div className="MovesContainer">
          <MovesContainer movesList={props.user.moves}/>
        </div>
      )
    }
    else{
      return(
        <div className="MessageContainer">
          <MessageScreen prompts={this.props.battle.prompt} />
        </div>
      )
    }
  }

  render(){
    return(
    <div className={"BattleContainer"}>
        {this.renderBattleCards(this.props)}
    </div>
    )
  }
}

export default connect(
  mapStateToProps
  )(BattleCard)

