import React, { Component } from 'react';
import { connect } from 'react-redux';
import figures from '../../helpers/list_of_figures';
import BioCard from '../functional/BioCard';

export default class HeroSelection extends Component{

    selectFigure = (event) => {
        
    }

    showAllHeros = (object) => {
        let heroArray = [null, null, null, null, null, null]
        let i = 0
        for (const hero in object){
            let heroObject = object[hero]
            heroArray[i] = heroObject
            i = i + 1
        }
        return heroArray.map( (hero) => {
            return(
                <div className= "Base HeroCard" key={hero.name} onClick = {(event) => this.selectFigure(event)}>
                    <BioCard props={hero} />
                </div>
            )
        })
    }
    render(){
        return(
            <div className="AllHeroesSelect">
                {this.showAllHeros(figures)}
            </div>
        )
    }
}
