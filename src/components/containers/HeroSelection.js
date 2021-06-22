import React, { Component } from 'react';
import { connect } from 'react-redux';
import figures from '../../helpers/list_of_figures';
import BioCard from '../functional/BioCard';
import Confirm from '../dispatchers/Confirm';
import nicksDebugger from '../../helpers/nicksDebugger';
import './HeroSelection.css'


const mapStateToProps = (state) => {
    return { user: state.user }
}

class HeroSelection extends Component{

    // Triggered onClick
    selectFigure = (event) => {
        let selectedFigure = event.target.offsetParent.id
        this.props.choose_figure(selectedFigure)
    }
    // This will load 6 bioCards to select, each with a onCLick listener to select
    showAllHeros = (object) => {
        let heroArray = [null, null, null, null, null, null]
        let i = 0

        // This moves the heroes from an object to an array so it can be parsed
        for (const hero in object){
            let heroObject = object[hero]
            heroArray[i] = heroObject
            i = i + 1
        }

        // This will return an array of divs to be rendered. It maps through the newly created heroArray
        return heroArray.map( (hero) => {
            return(
                <th className= "HeroCard" id={hero.name} key={hero.name} onClick = {(event) => this.selectFigure(event)}>
                    <BioCard hero={hero} />
                </th>
            )
        })
    }

    // This is the logic that will render the Hero Selection Screen or the Confimation Component
    herosOrConfirm = (props) => {
        if (props.user.currentlySelected == null){
            return(
                <table className="AllHeroesSelect">
                    {this.showAllHeros(figures)}
                </table>
            )}
        else{
            return(
                <div className="ConfirmationContainer">
                    <Confirm figure={props.user.currentlySelected}/>
                </div>
            )}
    }

    render(){
        return(
            <div className="CreationContainer">
               {this.herosOrConfirm(this.props)}
            </div>
        )
    }
}

export default connect(mapStateToProps)(HeroSelection);