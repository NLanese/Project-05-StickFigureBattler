import { prependToMemberExpression } from '@babel/types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FigureCard from '../functional/FigureCard.js';
import MovesContainer from './MovesContainer.js'
import MessageScreen from '../functional/MessageScreen.js';

const mapStateToProps = (state) => {
    return { battle: state.battle, moves: state.moves }
  }
  

class BattleCard extends Component{

  renderBattleCards = (props) => {
    return props.battle.figures.map( (battler) => (
      <div className="BattlerCard" key={battler.id}>                                      
        <div className= "Stat Card">
          <FigureCard info={battler}/>
        </div>
        <div className= "Healthbar">
          <h3>Health: {battler.hp}</h3>
          <p><strong>Current Status Effect: </strong>{battler.status}</p>
        </div>
      </div>
    ))
  }

  render_moves_or_messages = (props) => {
    if(props.battle_details.whoseTurn = "user"){
      <div className="MovesContainer">
        <MovesContainer />
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

export default connect(mapStateToProps)(BattleCard)

