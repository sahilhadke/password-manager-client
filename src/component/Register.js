import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import TextInput from '../UI/TextInput'
import PasswordInput from '../UI/PasswordInput'

				
function Register() {

    const axios = require('axios');


	const [registerDetails, setRegisterDetails] = useState({
        creds:{            
            name: '',
            email: '',
            password: ''            
        },
        successRedirect: '/password-list'
    })

	const setField = (e, field) => {

        switch(field){
            case 'password':
                setRegisterDetails({
                    ...registerDetails,
                    creds:{
                        ...registerDetails.creds,
                        password: e.target.value
                    }
                })
                break;

            case 'email':
                setRegisterDetails({
                    ...registerDetails,
                    creds:{
                        ...registerDetails.creds,
                        email: e.target.value
                    }
                })
                break;

            case 'name':
                setRegisterDetails({
                    ...registerDetails,
                    creds:{
                        ...registerDetails.creds,
                        name: e.target.value
                    }
                })
                break;
            default:
                break;
        }

		
	}


	const register = (e) => {
		e.preventDefault()      

        console.log(registerDetails)

        // Validation!!

        axios.post(
            `${process.env.REACT_APP_API}user/register`,
            registerDetails.creds
        ).then(function (response) {
            // handle success
            console.log(response);
            localStorage.setItem('token', response.data.token)
            alert('account created!!')
            window.location.href='/password-list'

        }).catch(function (error) {
            // handle error
            console.log(error);
        }).then(function () {
            // always executed
        });
	}

    return (
        <div>
				
			<div style={{width:"100%",height:"1px"}}></div>	
			<h2 className="text-center main-title" >register</h2>
		
			<form className="slick-form" onSubmit={register}>

                <TextInput 
                    label="name"
                    change={(e) => {setField(e, 'name')}}
                />
			
				<TextInput 
                    label="email"
					change={(e) => {setField(e, 'email')}}
                />

				<PasswordInput 
					change={(e) => {setField(e, 'password')}}
				/>

				<button type='submit' className="login-button slick-button">Register</button>
				<p className="text-center mt-3 login-text">or</p>
				<Link to='/login'>
					<button className="login-button slick-button">Login</button>
				</Link>

				
			</form>
		</div>
    )
}

export default Register
