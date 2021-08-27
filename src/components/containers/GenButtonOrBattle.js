import {
    BrowserRouter as Router,
    Route
  }
from 'react-router-dom';
import BattleCard from '/BattleCard.js'
import Rules from '../functional/Rules';
import TypeChart from '../functional/TypeChart.js';
import NavBar from './NavBar';
import { connect } from 'react-redux';

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

class GenButtonOrBattle extends Component{
    handleRender = (props) => {
        if (props.battle.opp.created == false){
            return(
              <div>
                <button id="generation" onClick = {() => props.setUpOpp(props)}>Generate Battle!</button>
              </div>
            )
          }
        else{
        return(
            <Router>
            <div>
                <NavBar />
                <Route exact path="/" component={BattleCard}/>
                <Route exact path="/Rules" component={Rules}/>
                <Route exact path="/TypeChart" component={TypeChart}/>
                {/* <BattleCard user={this.props.user} /> */}
            </div>
            </Router>
        )}
    }
    
}

export default connect(
    null,
    mapDispatchToProps
)(GenButtonOrBattle)