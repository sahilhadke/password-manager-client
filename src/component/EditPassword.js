import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import TextInput from '../UI/TextInput'
import PasswordInput from '../UI/PasswordInput'

function EditPassword(props) {

    const [passDetails, setPassDetails] = useState();

    const myAPI = `${process.env.REACT_APP_API}passwords/add`

    const addPass = (e) => {
        e.preventDefault()
        addPassAPI()
    }
    
	const setField = (e, field) => {

        switch(field){
            case 'password':
                setPassDetails({
                    ...passDetails,
                    password: e.target.value                  
                })
                break;

            case 'email':
                setPassDetails({
                    ...passDetails,
                    username: e.target.value  
                })
                break;
            
            case 'website':
                setPassDetails({
                    ...passDetails,
                    website: e.target.value  
                })
                break;

            default:
                break;
        }		
	}

    const addPassAPI = async () => {

        try{
  
          const axios = require('axios')
  
          let config = {
            mode: 'no-cors',
            headers: {
              'Authorization': localStorage.getItem('token')
            }
          }

          let data = passDetails;

          axios.post(myAPI, data, config).then( (res) => {
            console.log('Response', res)
            if(res.status === 200){
                alert('password added!!!')
            }

          }).catch( (e) => {
              console.log('Error: ', e)
          })
        }catch{
  
        }
  
      }

    return (
        <div>
				
			<div style={{width:"100%",height:"1px"}}></div>	
			<h2 className="text-center list-title" >edit password</h2>
		
			<form className="slick-form" onSubmit={addPass}>

				<TextInput 
                    label="website"
					change={(e) => {setField(e, 'website')}}
                />

                <TextInput 
                    label="username / email"
					change={(e) => {setField(e, 'email')}}
                />

				<PasswordInput 
					change={(e) => {setField(e, 'password')}}
				/>

				<button type='submit' className="login-button slick-button">save password</button>
				<button className="login-button slick-button delete-button">delete password</button>
                <Link to='password-list'>
				    <button className="login-button slick-button slick-button">back</button>
                </Link>
				
			</form>
		</div>
    )
}

export default EditPassword
