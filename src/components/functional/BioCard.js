import React from 'react';
import Picture from './Picture';
import './BioCard.css'
import nicksDebugger from '../../helpers/nicksDebugger'; 

const statsRender = (props) => {
    let statsArray = [null, null, null, null, null, null]
    let i = 0
    for (const stat in props.stats){
        statsArray[i] = props.stats[stat]
        i = i + 1
    }
    return statsArray.map( (stat, index) => {
        switch(index){
            case(2):
                return(<li key="atk">Attack: {stat}</li>)
            case(3):
                 return(<li key="def">Defense: {stat}</li>)
            case(4):
                 return(<li key="sAtk">Special Attack: {stat}</li>)
            case(5):
                 return(<li key="sDef">Special Defense: {stat}</li>)
            case(1):
                 return(<li key="spd">Speed: {stat}</li>)
            case(0):
                return(<li key="hp">Health Points: {stat}</li>)
        }
    })
}

const BioCard = (props) => {
    return(
        <div className="BaseCard">
            <div className="BaseInfo">
                <h3>{props.hero.name}</h3>
                <p>{props.hero.bio}</p>
            </div>
            <div className="FigureImage">
                <Picture name={props.hero.name} />
            </div>
            <ul className= "BaseStats">
                {statsRender(props.hero)}
            </ul>
        </div>
    )
}

export default BioCard