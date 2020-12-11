
import React from 'react';

const SearchBar = props => {
    return (
        <>
           <input className="newssearch form-control shadow p-4 mt-5 bg-white rounded" type="search" placeholder={"Search article titles in "+props.category} aria-label="Search" onChange={props.handleFilter}/>
        </>
    )
}

export default SearchBar;


