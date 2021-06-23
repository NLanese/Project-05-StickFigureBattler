import { connect } from 'react-redux';
import './App.css';
import BattleCard from './components/containers/BattleCard';
import React, { Component } from 'react';
import CreationContainer from './components/dispatchers/CreationContainer';
import Loading from './components/functional/Loading';

const DOMAIN = "http://localhost:3000/"

function fetchOpp(user){
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
      .then(json => dispatch({type: 'START_BATTLE', oppo: json, user: user}))
  }
} 

const mapDispatchToProps = (dispatch) => {
  return ({
    setUpUser: (figure) => dispatch({type: "SET_USER", payload: figure}),
    setUpOpp: (level) =>  dispatch(fetchOpp(level))
  })
}

const mapStateToProps = (state) => {
  return { user: state.user,
           battle: state.battle }
}


class App extends Component {

  battle_or_genButton = (props) => {
    if (props.battle.opp.created == false){
      return(
        <div>
          <button id="generation" onClick={props.setUpOpp(props.user)}>Generate Battle!</button>
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

  intro_or_resume_or_loading = (props) => {
    if (props.user.loading === true || props.battle.loading === true){
      return(
        <div className="LoadingScreen">
          <Loading />
        </div>
      )
    }
    else if (props.user.created === true){
      return(
        <div className="BattleContainer">
          {this.battle_or_genButton(props)}
        </div>
      )
    }
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
