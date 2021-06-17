import React, { Component } from 'react';
import { connect } from 'react-redux';
import FigureCard from '../presentational/FigureCard'

const mapStateToProps = (state) => {
    return { battle: state.battle, moves: state.moves }
  }
  

class BattleCard extends Component{

  renderBattleCards = (props) => {
    return props.battle.map( (battler) => (
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

  render(){
    <div className={"BattleContainer"}>
      {this.renderBattleCards(this.props)}
    </div>
  }
}

export default connect(mapStateToProps)(BattleCard)

