import React from 'react'
import getImage from '../../helpers/getImage'

const Picture = (props) => {
    return(
        <div className="CardImage">
            {getImage(props.name)}
        </div>
    )
}

export default Picture