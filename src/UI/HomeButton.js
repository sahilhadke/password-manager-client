import React from 'react'
import { Link } from 'react-router-dom'

function HomeButton(props) {

    var buttonClass = 'home-button'

    if(props.top)
        buttonClass = 'home-button isTop'
    

    return (
        <Link to={props.path}>
            <button className={buttonClass}>{props.text}</button>
        </Link>
    )
}

export default HomeButton
