import React, { Component } from 'react';
import { connect } from 'react-redux';
import figures from '../../helpers/list_of_figures';
import YourNameField from '../functional/YourNameField';
import HeroSelection from '../containers/HeroSelection';


//  ACTIONS - BELOW  //
function sendUserName(content){
    return {type: 'CREATE_USER_NAME', payload: content}
}
function submitPlayerFigure(figureObj){
    return {type: 'CREATE_USER_FIGURE', user_figure: figureObj} 
}
//  ACTIONS - ABOVE //

//  CONNECT and PROVIDER FUNCTIONS - BELOW  //
const mapDispatchToProps = (dispatch) => {
    return {
        enterName: (content) => { dispatch(sendUserName(content)) },
        createPlayerFigure: (obj) => { dispatch(submitPlayerFigure(obj)) }
    }
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
                    <HeroSelection />
                </div>
            </div>
        )
    }

}

export default connect(
    mapDispatchToProps
)(CreationContainer)