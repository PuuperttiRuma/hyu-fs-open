import React from 'react'

const SearchBar = (props) => {
    return (
        <div>
            search
            <input type="text" value={props.searchName} onChange={props.handleSearchChange} />
        </div>
    )
}

export default SearchBar