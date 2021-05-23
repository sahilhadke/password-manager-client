import React from 'react'

function SinglePassword(props) {
    return (
        <div className="single-pass row">
            <div className="col-2 icon-col">
                <i className='fa fa-circle-o'></i>
            </div>
            <div className="col-10 text-col">
            <p>{props.website}</p>
            <i className='fa fa-angle-right'></i>
            </div>
        </div>
    )
}

export default SinglePassword
