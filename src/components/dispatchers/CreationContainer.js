import React, { Component } from 'react';
import { connect } from 'react-redux';
import YourNameField from '../functional/YourNameField';
import HeroSelection from '../containers/HeroSelection';
import './CreationContainer.css'

//  ACTIONS - BELOW  //
    //  Submits name from YourNameField Component
function sendUserName(content){
    let nameObj = {type: 'CREATE_USER_NAME', payload: content}
    return nameObj
}
    // Submits the figure name to state, takes figured that was clicked on from HereSelection Component
function submitPlayerFigure(figureObj){
    return {type: 'CREATE_USER_FIGURE', figure: figureObj} 
}
function selectedFigure(figureName){
    return {type: 'SELECT_USER_FIGURE', figureName: figureName}
}
//  ACTIONS - ABOVE //

//  CONNECT and PROVIDER FUNCTIONS - BELOW  //
const mapDispatchToProps = (dispatch) => {
    return({
        enterName: (content) =>  dispatch(sendUserName(content)),
        chooseFigure: (name) => dispatch(selectedFigure(name)),
        createPlayerFigure: (obj) =>  dispatch(submitPlayerFigure(obj)) 
    })
}
//  CONNECT and PROVIDER FUNCTIONS - ABOVE  //
  

class CreationContainer extends Component{

    render(){
        return(
            <div class="New-Player-Form">
                <div class="Name_Field">
                    <YourNameField name_dispatch={this.props.enterName} />
                </div>
                <div class="Figure-Selector">
                    <HeroSelection choose_figure={this.props.chooseFigure} submit_figure={this.props.createPlayerFigure}/>
                </div>
            </div>
        )
    }

}

export default connect(
    null,
    mapDispatchToProps
)(CreationContainer)