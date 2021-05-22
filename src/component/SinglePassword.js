import React from 'react'
import WebsiteImage from './website.jpg'

const SinglePassword = (props) => {
  return (
    <div className="single-pass">
      <div className="container">
        <div className="row">
          <div className="col-2 icon-div">
            <img src={WebsiteImage} alt={props.website} />
          </div>
          <div className="col-8 title-div">
            <p>{props.website}</p>
          </div>
          <div className="col-2 copy-button-div">
            <i className="fa fa-angle-right"></i>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SinglePassword
