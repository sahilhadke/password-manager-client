import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
    const mystyle = {
        width:"100%",
        height:"1px"
    }
    return (
        <div>
            <div style={mystyle}></div>	
			<h2 className="text-center main-title" >password manager</h2>

            <Link to='login'>
                <button className="slick-button">Login</button>
            </Link>

            <Link to='register'>
            <button className="slick-button">Register</button>
            </Link>
        </div>
    )
}

export default Home
