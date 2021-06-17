import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';


export default class FigureCard extends Component{
    getImage(props){
        switch(props.image){
            case("Knight"):
                const figure = require('..../public/Knight.jpeg')
                return(figure)
            case("Mad Scientist"):
                const figure = require('..../public/MadScientist.jpeg')
                return(figure)
            case("Martian"):
                const figure = require('..../public/Martian.jpeg')
                return(figure)
            case("Pirate"):
                const figure = require('..../public/PirateGuy.jpeg')
                return(figure)
            case("Robot"):
                const figure = require('..../public/Robot.jpeg')
                return(figure)
            case("Secret Service"):
                const figure = require('..../public/SecretServiceGuy.jpeg')
                return(figure)
            case("Superhero"):
                const figure = require('..../public/SuperHero.jpeg')
                return(figure)
            case("DarkFigure"):
                const figure = require('..../public/DarkFigure.jpeg')
                return(figure)
        }
    }
    render(){
        <div className="Figure Card"> 
            <div className="Figure Image">
                <img src= {this.getImage(this.props)} />
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