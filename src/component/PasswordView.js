import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SinglePassword from '../UI/SinglePassword'

function PasswordView() {

    const [passList, setPassList] = useState([])

    const [searchText, setSearchText] = useState('')

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
          setPassList(resData.data)

    
        }catch(e){
        }     
      }

      const Search = () => {

        setSearchText(document.querySelector('#search-bar').value)

      }
    
      useEffect(() => {
        fetchPasswords()
      }, [])

    return (
        <div>
            <div className="top-nav row">
                <div className="col-10 text-center input-col">
                    <input placeholder="Search" value={searchText} id='search-bar' onChange={Search}/>
                    <i className="fa fa-search"></i>                   
                </div>
                <div className="col-2 icon-col">
                    <Link to='/profile'>
                        <i className="fa fa-user-o"></i>
                    </Link>
                </div>
            </div>

            <div className='top-text'>
                <h2>Welcome back!</h2>
            </div>


            <div className='password-list'>
                <p>passwords</p>

                <div className='pass-list-scroll'>
                    {
                    passList.map((pass) => {
                        if(pass.website.search(searchText) != -1){
                            return <Link key={pass._id} to={`/password/view/${pass._id}`}>
                            <SinglePassword website={pass.website}/>
                        </Link> 
                        }
                        
                    })}
                </div>
            </div>

            <Link to='/password/add'>
                <div className="add-button">
                    <p>+</p>
                </div>
            </Link>

        </div>
    )
}

export default PasswordView
