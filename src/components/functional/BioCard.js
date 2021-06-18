import React, { Component } from 'react';

const statsRender = (props) => {
    let statsArray = [null, null, null, null, null, null]
    let i = 0
    for (const stat in props.stats){
        statsArray[i] = props.stats[stat]
    }
    return statsArray.map( (stat, index) => {
        switch(index){
            case(2):
                return(<li>Attack: {stat}</li>)
            case(3):
                 return(<li>Defense: {stat}</li>)
            case(4):
                 return(<li>Special Attack: {stat}</li>)
            case(5):
                 return(<li>Special Defense: {stat}</li>)
            case(1):
                 return(<li>Speed: {stat}</li>)
            case(0):
                return(<li>Health Points: {stat}</li>)
        }
    })
}

const BioCard = (props) => {
    return(
        <div clasSName= "Base Card">
            <h3>{props.name}</h3>
            <p>{props.bio}</p>
            <img src={props.image} />
            <ul className= "Base Stats">
                {statsRender(props)}
            </ul>
        </div>
    )
}

export default BioCard