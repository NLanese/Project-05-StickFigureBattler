import { connect } from 'react-redux';
import './App.css';
import React, { Component } from 'react';
import CreationContainer from './components/dispatchers/CreationContainer';
import Loading from './components/functional/Loading';
import { FailureOrLevel } from './components/containers/FailureOrLevel';
import GenButtonOrBattle from './components/containers/GenButtonOrBattle';


const DOMAIN = "http://localhost:3000/"

// SETS UP THE OPPONENT FIGURE AND OPP FIGURE'S MOVES

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

  // IF LOADING AT ANY POINT
  // user.loading == true, battle.loading == true
  intro_or_resume_or_loading = (props) => {
    if (props.user.loading === true || props.battle.loading === true){
      return(
        <div className="LoadingScreen">
          <Loading />
        </div>
      )
    }

    // STARTS GAME ONCE USER IS CREATED
    // user.created == true
    else if (props.user.created === true || props.battle.levelUp === true){
      return(
        <div>
          <FailureOrLevel user={props.user} battle={props.battle} />
        </div>
      )
    }

    else if (props.user.created == true){
      <div>
        <GenButtonOrBattle battle={props.battle} />
      </div>
    }


    // BEFORE GAME, WHEN NO USER CREATED
    // user.created == false
    else{
      return(
        <div className="Create Form">
           <CreationContainer />
        </div>
      )
    }
  }

  render(){
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
