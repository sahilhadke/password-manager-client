import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import TextInput from '../UI/TextInput'
import PasswordInput from '../UI/PasswordInput'
				
function Login() {

    const axios = require('axios');

	const [loginDetails, setLoginDetails] = useState({
        creds:{         
            email: '',
            password: ''            
        }
    })

	const setField = (e, field) => {

        switch(field){
            case 'password':
                setLoginDetails({
                    ...loginDetails,
                    creds:{
                        ...loginDetails.creds,
                        password: e.target.value
                    }
                })
                break;

            case 'email':
                setLoginDetails({
                    ...loginDetails,
                    creds:{
                        ...loginDetails.creds,
                        email: e.target.value
                    }
                })
                break;

            default:
                break;
        }		
	}

	const login = async (e) => {
		e.preventDefault()      

        // Validation!!
        try{
            const response = await axios.post(
                `${process.env.REACT_APP_API}user/login`,
                loginDetails.creds
            );
    
            if(response.status === 200){
                localStorage.setItem('token', response.data.token)
                alert('logged in!!')
                window.location.href='/password-list'               
            }else{
                alert('invalid cred!!')
            }
        }catch{
            alert('something went wrong!!')
        }
	}

    return (
        <div>
				
			<div style={{width:"100%",height:"1px"}}></div>	
			<h2 className="text-center main-title" >login</h2>
		
			<form className="slick-form" onSubmit={login}>
			
				<TextInput 
                    label="email"
					change={(e) => {setField(e, 'email')}}
                />

				<PasswordInput 
					change={(e) => {setField(e, 'password')}}
				/>

				<button type='submit' className="login-button slick-button">login</button>
				<p className="text-center mt-3 login-text">or</p>
				<Link to='/register'>
					<button className="login-button slick-button">register</button>
				</Link>

				
			</form>
		</div>
    )
}

export default Login
