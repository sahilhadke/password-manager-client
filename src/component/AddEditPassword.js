import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import TextInput from '../UI/TextInput'
import PasswordInput from '../UI/PasswordInput'

function AddEditPassword(props) {

    const [passDetails, setPassDetails] = useState({
        website: '',
        username: '',
        password: ''
    });
    const { id } = useParams()
    const editAction = props.action === 'edit'


    const myAPI = `${process.env.REACT_APP_API}passwords/add`

    const addPass = (e) => {
        e.preventDefault()
        document.getElementById('save-password-button').disabled = 'true'
        addPassAPI()
    }
    
	const setField = (e, field) => {

        switch(field){
            case 'password':
                console.log('passchanged!')
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
                window.location.href = '/password-list'
            }

          }).catch( (e) => {
              console.log('Error: ', e)
          })
        }catch{
  
        }
  
    }

    const fetchPass = async () => {
        const axios = require('axios')
        let config = {
            mode: 'no-cors',
            headers: {
            'Authorization': localStorage.getItem('token')
            }
        }
        const resData = await axios.get(
            `${process.env.REACT_APP_API}passwords?_id=${id}`,
            config
        )
        console.log(resData)
        setPassDetails(resData.data)
    }

    const updatePass = async (e) => {
        e.preventDefault()
        const axios = require('axios')
        let config = {
            mode: 'no-cors',
            headers: {
            'Authorization': localStorage.getItem('token')
            }
        }
        const resData = await axios.patch(
            `${process.env.REACT_APP_API}passwords/update?_id=${id}`,
            {
                username: passDetails.username,
                password: passDetails.password
            },
            config
        )

        if(resData.status === 200){
            alert('password edited!!!')
            window.location.href = '/password-list'
        }

        setPassDetails(resData.data)
    }

    const deletePassword = async (e) => {

        e.preventDefault()
        try{
            console.log(localStorage.getItem('token'))
            const axios = require('axios')
            let config = {
                mode: 'no-cors',
                headers: {
                'Authorization': localStorage.getItem('token')
                }
            }
            const resData = await axios.delete(
                `${process.env.REACT_APP_API}passwords`,
                config,
                {
                    _id: id
                }                
            )
            if(resData.status === 200){
                window.location.href = '/password-list'
            }
        }catch{
            console.log('something went wrong!')
        }        
    }

    useEffect(() => {
        fetchPass()
    }, [])


    return (
        <div>
				
			<div style={{width:"100%",height:"1px"}}></div>	
			<h2 className="text-center list-title" >{ editAction ? passDetails.website : props.title}</h2>
		
			<form className="slick-form" onSubmit={editAction ? updatePass : addPass}>
                { !editAction && <TextInput 
                    label="website"
					change={(e) => {setField(e, 'website')}}
                />}
				

                <TextInput 
                    label="username / email"
                    value={passDetails.username}
					change={(e) => {setField(e, 'email')}}
                />

				<PasswordInput 
                    value={passDetails.password}
					change={(e) => {setField(e, 'password')}}
				/>

				<button type='submit' id='save-password-button' className="login-button slick-button">save password</button>
                
            </form>
                {editAction && <button onClick={deletePassword} className="login-button slick-button delete-button">delete password</button>}
				
                <Link to='/password-list'>
				    <button className="login-button slick-button slick-button">back</button>
                </Link>
				
			
		</div>
    )
}

export default AddEditPassword
