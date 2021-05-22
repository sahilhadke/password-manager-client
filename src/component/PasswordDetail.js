import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import PassDetail from '../UI/PassDetail'

function PasswordDetail(props) {

    const { id } = useParams()
    const [creds, setCreds] = useState({
        id: id,
        website: 'please wait',
        username: 'please wait',
        password: 'please wait'
    })

    const myAPI = `${process.env.REACT_APP_API}passwords?_id=${creds.id}`

    const fetchCreds = async () => {
        try{

            const axios = require('axios')

            let config = {
                mode: 'no-cors',
                headers: {
                'Authorization': localStorage.getItem('token')
                }
            }
            
            axios.get(myAPI, config).then( (res) => {

                setCreds({
                    ...creds,
                    password: res.data.password,
                    website: res.data.website,
                    username: res.data.username
                })
            })
        }catch{

        }
    }

    useEffect(() => {
        fetchCreds()
    }, [])
    

    return (
        <div>

            <Link to='/password-list'>
                <i className="fa fa-arrow-left close-button"></i>
            </Link>
			<div style={{width:"100%",height:"1px"}}></div>
			<h2 className="text-center main-title" >{creds.website || 'website'}</h2>
            
            <PassDetail
                icon='fa-user'
                type='text'
                value={creds.username}
            />
            <PassDetail
                icon='fa-key'
                type='password'
                value={creds.password}
            />

            <p className="login-text text-center mt-5">tap the text to copy</p>
            <p className="login-text text-center mt-2" id="copy-text"></p>

            <Link to={`/password/edit/${creds.id}`}>
                <div className="add-pass-button">
                    <i className="fa fa-pencil"></i>
                </div>
            </Link>
        </div>
    )
}

export default PasswordDetail
