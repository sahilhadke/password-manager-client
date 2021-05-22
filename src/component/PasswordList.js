import React, { useState, useEffect } from 'react'
import SearchBar from '../UI/SearchBar'
import { Link } from 'react-router-dom'
import SinglePassword from './SinglePassword'

function PasswordList() {

  const [passList, setPassList] = useState([
    {
      website: 'Please wait'
    }
  ])
  const myAPI = `${process.env.REACT_APP_API}passwords/all`

  const fetchPasswords = async () => {

    try{

      const axios = require('axios')

      let config = {
        mode: 'no-cors',
        headers: {
        'Authorization': localStorage.getItem('token')
        }
      }
      
      const resData = await axios.get(myAPI, config)
      console.log(`🆔`, resData.data)
      setPassList(resData.data)

    }catch(e){
      console.log(e)
    }     
  }

  useEffect(() => {
    fetchPasswords()
  }, [])

  return (
    <div className="passlist">
        <h2 className="text-center list-title" >password list</h2>

        <SearchBar />

        {passList.map((pass) => {
             
          return <Link key={pass._id} to={`password/view/${pass._id}`}>
            <SinglePassword website={pass.website} />
          </Link>
            
        })}

    <Link to='add-pass'>
      <div className="add-pass-button">
        <i className="fa fa-plus"></i>
      </div>
    </Link>

    </div>
  )
}

export default PasswordList
