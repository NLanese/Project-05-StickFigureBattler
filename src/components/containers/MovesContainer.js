import React, { Component } from 'react';
import Move from '../dispatchers/Move';
import { connect } from 'react-redux';
import './MovesContainer.css'

const mapStateToProps = (state) => {
    return({
        movesList: state.user.moves
    })
}

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
        return(
        <div className="MovesContainer">
            {this.renderMoves(this.props.movesList)}
        </div>
        )
    }
}

export default connect(mapStateToProps)(MovesContainer)