import React from 'react'

const CountryInfo = ({ countries }) => {
    if (countries.length === 0) {
        return null
    }

    if (countries.length > 10) {
        return <p>Narrow your search</p>
    } else {
        return (
            <div>
                {countries.map(country => <li>{country.name}</li>)}
            </div>
        )
    }
}

export default CountryInfo