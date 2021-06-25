import React, { Component } from 'react';
import Move from '../dispatchers/Move';
import './MovesContainer.css'

class MovesContainer extends Component{
    
    renderMoves(moves){
        return moves.map( (move, index) => {
            return(
                <div className="iMove" id={`move${index}`} key={index}>
                    <Move m={move} />
                </div>
            )
        })
    }

    render(){
        console.log("Inside Moves Container")
        console.log(this.props.moves)
        return(
        <div className="MovesContainer">
            {this.renderMoves(this.props.movesList)}
        </div>
        )
    }
}

export default MovesContainer