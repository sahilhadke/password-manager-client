import React from 'react'

function PassDetail(props) {

    const isPass = props.type === 'password'

    const viewPass = () => {

        const passInput = document.querySelector('#detail-pass')

        passInput.type === 'text'?
        passInput.type = 'password':
        passInput.type = 'text'

        return
    }

    return (
        <div className="pass-detail-div">
            <div className="container pass-detail-container">
                <div className="row">
                <div className="col-2 text-center">
                    <button><i className={`fa ${props.icon}`}></i></button>
                </div>
                <div className="col-8">
                    <input type={props.type} id={isPass ? 'detail-pass' : null} readOnly className="search-bar" value={props.value}/>
                </div>  

                {isPass ? 
                <div className="col-2 text-center">
                    <button onClick={viewPass}><i className={`fa fa-eye`}></i></button>
                </div> : null }
                  

                </div>
            </div>	
        </div>
    )
}

export default PassDetail
