import { connect } from 'react-redux';
import './App.css';
import BattleCard from './components/containers/BattleCard';
import React, { Component } from 'react';
import CreationContainer from './components/dispatchers/CreationContainer';

class App extends Component {

  intro_or_resume = (props) => {
    console.log(props)
    if (props.user.created === true){
      return(
        <div className="Battle Container">
           <BattleCard />
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

  testPlease = () => {
    console.log("hello!")
  }

  render() {
    return (
      <div className="Main-Window">
        {this.testPlease()}
        {this.intro_or_resume(this.props)}
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps)(App);
