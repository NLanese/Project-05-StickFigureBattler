import React, { Component } from 'react';
import Move from '../dispatchers/Move';

class MovesContainer extends Component{
    
    renderMoves(moves){
        return moves.map( (move, index) => {
            return(
                <div className="iMove" id={index} key={index}>
                    <Move m={move} />
                </div>
            )
        })
    }

    render(){
        return(
        <div className="MovesContainer">
            {this.renderMoves(this.props.moves)}
        </div>
        )
    }
}

export default MovesContainer