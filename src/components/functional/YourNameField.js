import React, { Component } from 'react';
import { connect } from 'react-redux';
  
let handleChange = (event) => {
    return event.target.value
}

const YourNameField = (props) => {
    <input type="text" onChange={props.name_dispatch(handleChange)} />
}

export default YourNameField