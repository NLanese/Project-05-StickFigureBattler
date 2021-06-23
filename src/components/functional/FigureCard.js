import React, { Component } from 'react'
import Picture from './Picture'
import './FigureCard.css'

const FigureCard = (props) => {
    console.log("Figure Card Props")
    console.log(props)
    const imageSrc = props.info.title
    return(
        <div className="figureStats">
            <h3>Name: {props.info.title} </h3>
            <div id="inBattlePic">
                <Picture name={imageSrc} />
            </div>
            <h2>Type(s): {props.info.type}</h2>
            <p>Atk: {props.info.atk} || sAtk: {props.info.sAtk} || Def: {props.info.def} || sDef: {props.info.sDef} || Spd: {props.info.spd}</p>
        </div>
    )
}

export default FigureCard