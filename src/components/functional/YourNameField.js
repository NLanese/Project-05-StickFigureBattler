import React from 'react';


let handleChange = (event) => {
    console.log(event.target.value)
    return event.target.value
}

const YourNameField = (props) => {
    return(
        <div className="NameForm">
            <h3>Enter the name for your Stick Figure Below</h3>
            <input type="text" onChange={(event) => props.name_dispatch(handleChange(event))} />
            <h4>Then click on a Stick Figure Card to select your class!</h4>
        </div>
    )
}

export default YourNameField