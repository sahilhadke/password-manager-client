import React, { useState } from 'react'
import _uniqueId from 'lodash/uniqueId';

function Input(props) {

    const [uniqueIds] = useState({
        id1: _uniqueId('input-'),
        id2: _uniqueId('icon-')
    });

    const toggleSeePass = () => {
        document.getElementById(`${uniqueIds.id1}`).type === 'text' ?
        document.getElementById(`${uniqueIds.id1}`).type = 'password' :
        document.getElementById(`${uniqueIds.id1}`).type = 'text';

        document.getElementById(`${uniqueIds.id2}`).classList.toggle('fa-eye-slash')
        document.getElementById(`${uniqueIds.id2}`).classList.toggle('fa-eye')
    }

    const clearText = () => {
        props.clearTextProp()
        document.getElementById(`${uniqueIds.id1}`).value = ''
    }


    return (
        <div style={{margin:'20px 0'}}>
            <label>{props.label}</label>
            <div className='form-input'>
                <input type={props.type} id={`${uniqueIds.id1}`}  readOnly={props.readOnly} value={props.value} onChange={props.change} /> 

                {
                    !props.disableIcons &&
                    (props.type === 'text' ? 
                    <i className="fa fa-close"  onClick={clearText}></i>:
                    <i className="fa fa-eye-slash" id={`${uniqueIds.id2}`} onClick={toggleSeePass}></i>)
                    
                }
                
            </div>
        </div>
    )
}

export default Input
