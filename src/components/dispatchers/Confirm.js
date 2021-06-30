import React, { Component } from 'react';
import { connect } from 'react-redux';
import figures from '../../helpers/list_of_figures';
import BioCard from '../functional/BioCard';
import './Confirm.css'
import makeMoveObj from '../../helpers/makeMoveObj';
import confirm from '../../helpers/confirmationAction';

const mapDispatchToProps = (dispatch) => {
    return ({
        confirmFigure: (figure) => dispatch(confirm(figure)),
        unSelect: () => dispatch({type: 'DESELECT'})
    })
}

class Confirm extends Component{

    findHero = (props) => {
        for (const figure in figures){
            if (figures[figure].name === props.figure){
                return figures[figure]
            }
        }
    }

    render(){
        return(
            <div className="ConfirmBox">
                <h3 id="confirmation">Confirm This Character?</h3>
                <div className="SelectedFigure">
                    <BioCard hero={this.findHero(this.props)} />
                </div>
                <button id="yes" onClick={() => this.props.confirmFigure(this.findHero(this.props))}>Yes!</button> 
                <button id="no" onClick={() => this.props.unSelect()}>No!</button>
            </div>
        )
    }
}

export default connect(
    null,
    mapDispatchToProps
)(Confirm)