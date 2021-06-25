import { connect } from 'react-redux';
import './App.css';
import BattleCard from './components/containers/BattleCard';
import React, { Component } from 'react';
import CreationContainer from './components/dispatchers/CreationContainer';
import Loading from './components/functional/Loading';

const DOMAIN = "http://localhost:3000/"

function fetchOpp(props){
  let user = props.user
  let level = user.level
  let route = ""
  if (level == 1){
    route = "first_battle"
  }
  else if (level == 2){
    route = "second_battle"
  }
  else if (level == 3){
    route = "third_battle"
  }
  return (dispatch) => {
    dispatch({type: 'LOAD_BATTLE'})
    fetch(DOMAIN + route)
      .then(resp => resp.json())
      .then(json => { 
        dispatch(props.setUpUser(user))
        return {hp: json.hp, created: true, name: json.name, title: json.title, level: json.level, type: json.class_type,
               spd: json.spd, atk: json.atk, def: json.def, sDef: json.sDef, sAtk: json.sAtk, moves: json.moves} 
      })
      .then(opponent => dispatch({type: 'START_BATTLE', oppo: opponent, user: user}))
  }
} 

const mapDispatchToProps = (dispatch) => {
  return ({
    setUpUser: (figure) => dispatch({type: "SET_USER", payload: figure}),
    setUpOpp: (figure) =>  dispatch(fetchOpp(figure))
  })
}

const mapStateToProps = (state) => {
  return { user: state.user, battle: state.battle }
}


class App extends Component {

  // MAKES YOU GENERATE EACH NEW BATTLE TO FETCH PROPERLY
  battle_or_genButton = (props) => {
    if (props.battle.opp.created == false){
      return(
        <div>
          <button id="generation" onClick = {() => props.setUpOpp(props)}>Generate Battle!</button>
        </div>
      )
    }
    else{
      return(
        <div>
          <BattleCard user={this.props.user} />
        </div>
      )
    }
  }

  // IF LOADING AT ANY POINT
  intro_or_resume_or_loading = (props) => {
    if (props.user.loading === true || props.battle.loading === true){
      return(
        <div className="LoadingScreen">
          <Loading />
        </div>
      )
    }

    // STARTS GAME ONCE USER IS CREATED
    else if (props.user.created === true){
      return(
        <div className="BattleContainer">
          {this.battle_or_genButton(props)}
        </div>
      )
    }

    // BEFORE GAME, WHEN NO USER CREATED
    else{
      return(
        <div className="Create Form">
           <CreationContainer />
        </div>
      )
    }
  }

  render() {
    return (
      <div className="Main-Window">
        {this.intro_or_resume_or_loading(this.props)}
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(App);
