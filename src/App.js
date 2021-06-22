import { connect } from 'react-redux';
import './App.css';
import BattleCard from './components/containers/BattleCard';
import React, { Component } from 'react';
import CreationContainer from './components/dispatchers/CreationContainer';
import Loading from './components/functional/Loading';

const DOMAIN = "http://localhost:3000/"

function fetchOpp(level){
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
    console.log("Right before the LOAD_BATTLE dispatch")
    dispatch({type: 'LOAD_BATTLE'})
    fetch(DOMAIN + route)
      .then(resp => resp.json())
      .then(json => console.log(json))
  }
} 

const mapDispatchToProps = (dispatch) => {
  return ({
    setUpUser: (figure) => dispatch({type: "SET_USER", payload: figure}),
    setUpOpp: (level) =>  fetchOpp(level)
  })
}

const mapStateToProps = (state) => {
  return { user: state.user,
           battle: state.loading }
}

function battle_or_genButton(user){
  if (opp.created == false){
    <button onClick={this.props.setUpOpp(user.level)}>Generate Battle!</button>
  }
}

class App extends Component {

  intro_or_resume_or_loading = (props) => {
    if (props.user.loading === true || props.battle_loading === true){
      return(
        <div className="LoadingScreen">
          <Loading />
        </div>
      )
    }
    else if (props.user.created === true){
      <div className="BattleContainer">
        {battle_or_genButton(user.level)}
      </div>
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
