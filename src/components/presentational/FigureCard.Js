import React, { Component } from 'react';
import { connect } from 'react-redux';
import getImage from '../../helpers/getImage';
import './App.css';


export default class FigureCard extends Component{
    render(){
        <div className="Figure Card"> 
            <div className="Figure Image">
                <img src= {getImage(this.props)} />
            </div>
            <div className="Figure Stats">
                <h3>{this.props.name} - Lvl {this.level}</h3> 
                <h2>Type(s): {this.props.type}</h2>
                <p>Attack: {this.props.atk} - Defense: {this.props.def}</p>
                <p>Special Attack: {this.props.sAtk} - Special Defense: {this.props.sDef}</p>
                <p>Max HP: {this.props.hp} - Speed: {this.props.spd}</p>
            </div>
        </div>
    }
}