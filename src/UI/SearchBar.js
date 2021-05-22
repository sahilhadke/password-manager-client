import React from 'react'

function SearchBar() {
    return (
        <div className="search-bar-div">
            <div className="container search-bar-container">
            <div className="row">
                <div className="col-10">
                <input type="text" className="search-bar" placeholder="SEARCH"/>
                </div>
                <div className="col-2">
                <button type="submit"><i className="fa fa-search"></i></button>
                </div>
            </div>
            </div>				
        </div>
    )
}

export default SearchBar
