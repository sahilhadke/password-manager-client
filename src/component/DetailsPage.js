import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import HomeButton from '../UI/HomeButton'
import Input from '../UI/Input'
import Modal from '../UI/Modal'


const DetailsPage = (props) => {
    const [details, setDetails] = useState({
        username: '',
        website: '',
        email: '',
        password: ''
    })

    const [dispModal, setDispModal] = useState(false)

    const axios = require('axios')
    var showModal = false;

   
    var {id} = useParams();

    const deleteUser = async () => {

    }

    const deletePassword = async () => {
        try{
            setDispModal(true)
            let config = {
                mode: 'no-cors',
                headers: {
                'Authorization': localStorage.getItem('token')
                },
                data: {
                    _id: id
                }
            }
            const resData = await axios.delete(
                `${process.env.REACT_APP_API}passwords`,
                config            
            )
            if(resData.status === 200){
                alert('password deleted')
                setDispModal(false)
                window.location.href = '/password/view'
            }
        }catch{
            setDispModal(false)
        }finally{
            setDispModal(false)
        }
    }

    const editPassword = () => {
        window.location.href=`/password/edit/${id}`
    }

    const savePassword = async () => {
        try{

            setDispModal(true)
            let config = {
                mode: 'no-cors',
                headers: {
                'Authorization': localStorage.getItem('token')
                }
            }
            const resData = await axios.patch(
                `${process.env.REACT_APP_API}passwords/update?_id=${id}`,
                {
                    website: details.website,
                    username: details.username,
                    password: details.password
                },
                config
            )
    
            if(resData.status === 200){

                setDispModal(false)
                alert('password updated!!!')
                window.location.href = '/password/view'
            }
        }catch(e){
            setDispModal(false)
            alert(e)
        }
        
    }

    const fetchPassword = async () => {
        setDispModal(true)
        const myAPI = `${process.env.REACT_APP_API}passwords?_id=${id}`

        try{

            let config = {
                mode: 'no-cors',
                headers: {
                'Authorization': localStorage.getItem('token')
                }
            }
            
            axios.get(myAPI, config).then( (res) => {

                setDetails({
                    password: res.data.password,
                    website: res.data.website,
                    username: res.data.username
                })
                setDispModal(false)
            })
        }catch{
            setDispModal(false)
        }
    }

    const addPassword = async () => {

        try{

            setDispModal(true)

            const myAPI = `${process.env.REACT_APP_API}passwords/add`
            let config = {
              mode: 'no-cors',
              headers: {
                'Authorization': localStorage.getItem('token')
              }
            }
  
            axios.post(myAPI, details, config).then( (res) => {
              if(res.status === 200){
                    setDispModal(false)
                  alert('password added!!!')
                  window.location.href = '/password/view'
              }
  
            }).catch( (e) => {
                setDispModal(false)
            })  
          }catch{
            setDispModal(false)
          }
    }

    const register = async () => {

        try{
            setDispModal(true)
            const resData = await axios.post(
                `${process.env.REACT_APP_API}user/register`,
                details
            )
            if(resData.status === 200){
                localStorage.setItem('token', resData.data.token)
                setDispModal(false)
                alert('account created!!')
                window.location.href='/password/view'
            }
        }catch(e){
            setDispModal(false)
            alert(`${e}`)
        }finally{
            setDispModal(false)
        }
    }

    const login = async () => {
        try{
            setDispModal(true)
            const response = await axios.post(
                `${process.env.REACT_APP_API}user/login`,
                details
            );
    
            if(response.status === 200){
                localStorage.setItem('token', response.data.token)
                alert('logged in!!')
                window.location.href='/password/view'               
            }else{
                alert('invalid cred!!')
            }
        }catch{
            alert('something went wrong!!')
        }finally{
            setDispModal(false)
        }
    }

    const setField = (e, field, saveas) => {
        switch(field){
            case 'email':
                setDetails({
                    ...details,
                    [saveas]: e.target.value
                })
                break;
            
            case 'username':
                setDetails({
                    ...details,
                    [saveas]: e.target.value
                })
                break;

            case 'password':
                setDetails({
                    ...details,
                    [saveas]: e.target.value
                })
                break;
            default:
                break;
        }
    }

    const clearText = (attribute) =>{
        setDetails({
            ...details,
            [attribute]: ''
        })
    }   

    var mainAcion;

    switch(props.mainAction){
        case 'login':
            mainAcion = login
            break;
        case 'register':
            mainAcion = register
            break;
        case 'addPassword':
            mainAcion = addPassword
            break;
        case 'editPassword':
            mainAcion = editPassword
            break;
        case 'savePassword':
            mainAcion = savePassword
            break;
        default:
            mainAcion = null
    }

    useEffect(() => {

        function onLoadFun(){
            if(props.fetchPassword){
                fetchPassword()
            }
        }

        onLoadFun();
        
    }, [])

    return (
        <>

            {
                dispModal &&
                <Modal />
            }
            
            {
                props.setClose && 
                <Link to='/password/view'>
                    <div className="close-button">
                        <i className="fa fa-close"></i>
                    </div>
                </Link>
            }

            {
                showModal &&
                <Modal/>
            }
            
            {
                <div className='top-text'>
                    <h2>{props.pageTitle}</h2>
                </div>
            }
            

            {
                props.isHome &&
                <div className='home'>
                    <h2>password manager</h2>

                    <HomeButton 
                        top={true}
                        path='/login'
                        text='login'
                    />
                    <HomeButton 
                        path='/register'
                        text='register'
                    />

                </div>
            }
            

            {
                props.setForm &&
                <form className='pass-form'>

                    {
                        props.usernameInput &&
                        <Input 
                            type='text'
                            disableIcons={props.disableIcons}
                            change={(e) => setField(e, 'username', props.setWebsiteAs)}
                            label={props.nameLabel}
                            readOnly={props.readOnly}
                            value={details[props.setWebsiteAs]}
                            clearTextProp={()=>clearText(props.setWebsiteAs)}
                        />
                    }

                    {
                        props.emailInput &&
                        <Input 
                            change={(e) => setField(e, 'email', props.setEmailAs)}
                            type='text'
                            readOnly={props.readOnly}
                            disableIcons={props.disableIcons}
                            label={props.emailLabel || 'email'}
                            value={details[props.setEmailAs]}
                            clearTextProp={()=>clearText(props.setEmailAs)}
                        />
                    }

                    {
                        props.passwordInput &&
                        <Input 
                            type='password'
                            disableIcons={props.disableIcons}
                            readOnly={props.readOnly}
                            label='password'
                            change={(e) => setField(e, 'password', 'password')}
                            value={details.password}
                        />
                    }

                </form>

            }
            

            {
                props.setBin &&
                <div className="delete-button" onClick={props.deletePassword ? deletePassword : deleteUser}>
                    <i className="fa fa-trash-o"></i>
                </div>
            }

            {
                props.setSideText &&
                <Link to={props.sideTextLink}>
                    <p className='side-text'>{props.sideText}</p>
                </Link>
            }
            
            {
                props.setMainButton &&
                <div className="add-pass-button" onClick={mainAcion}>
                    <p>{props.mainButton}</p>
                </div>
            }
            
        </>
    )
}

export default DetailsPage