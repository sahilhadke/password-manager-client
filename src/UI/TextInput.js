import React, { useState } from 'react'
import _uniqueId from 'lodash/uniqueId';

const TextInput = (props) => {

	const [uniqueIds] = useState({
        id1: _uniqueId('input-'),
        id2: _uniqueId('div-')
    });

	const clearText = () => {
		document.getElementById(`${uniqueIds.id1}`).value = ''
	}

	const hightlight = () => {
		document.getElementById(`${uniqueIds.id2}`).classList.toggle('highlight')
	}

    return (
        <div className="input-master-div container" id={uniqueIds.id2}>
			<label className="input-label">{props.label}</label>
			<div className="input-div row">
				<div className="col-10 input-col">
					<input inputMode="text"  id={`${uniqueIds.id1}`} value={props.value} onFocus={hightlight} onBlur={hightlight} onChange={props.change} />
				</div>

				<div className="col-2 input-col text-center">
					<i className="fa fa-close" onClick={clearText}
					></i>
				</div>
			</div>
		</div>
    )
}

export default TextInput
