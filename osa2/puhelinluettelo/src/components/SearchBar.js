import React from 'react'

const SearchBar = (props) => {
    return (
        <label>
            search
            <input type="text" value={props.searchName} onChange={props.handleSearchChange} />
        </label>
    )
}

export default SearchBar