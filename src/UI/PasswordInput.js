import React, { useState } from 'react'
import _uniqueId from 'lodash/uniqueId';

const PasswordInput = (props) => {

    const [uniqueIds] = useState({
        id1: _uniqueId('input-'),
        id2: _uniqueId('icon-'),
        id3: _uniqueId('div-')
    });


    const toggleSeePass = () => {
        document.getElementById(`${uniqueIds.id1}`).type === 'text' ?
        document.getElementById(`${uniqueIds.id1}`).type = 'password' :
        document.getElementById(`${uniqueIds.id1}`).type = 'text';

        document.getElementById(`${uniqueIds.id2}`).classList.toggle('fa-eye-slash')
        document.getElementById(`${uniqueIds.id2}`).classList.toggle('fa-eye')
    }

    const hightlight = () => {
        document.getElementById(`${uniqueIds.id3}`).classList.toggle('highlight')
    }

    return (
        <div className="input-master-div container" id={uniqueIds.id3}>
            <label className="input-label">password</label>
            <div className="input-div row">
                <div className="col-10 input-col">
                    <input type="password" value={props.value}  id={`${uniqueIds.id1}`}  onFocus={hightlight} onBlur={hightlight} onChange={props.change}/>
                </div>

                <div className="col-2 input-col text-center">
                    <i className="fa fa-eye" id={`${uniqueIds.id2}`} onClick={toggleSeePass}></i>
                </div>
            </div>
        </div>
    )
}

export default PasswordInput
