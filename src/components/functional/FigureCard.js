import React, { Component } from 'react'
import getImage from '../../helpers/getImage'

const FigureCard = (props) => {
    return(
        <div className="figureStats">
            <h3>Name: {props.name}</h3>
            <h2>Type(s): {props.class_type}</h2>
            <p>Atk: {props.atk} || sAtk: {props.sAtk}</p>
            <p>Def: {props.def} || sDef: {props.sDef}</p>
            <p>Spd: {props.spd}</p>
            <img src={getImage(props)} />
        </div>
    )
}

export default FigureCard