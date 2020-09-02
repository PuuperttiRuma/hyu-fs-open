import React from 'react'

import CountryInfo from './CountryInfo'

const CountryListItem = ({ country, handleCountryChange }) => {
    return (
        <>
            <li>
                {country.name}
                <button onClick={() => handleCountryChange(country)}>show</button>
            </li>
        </>
    )
}

const SearchResults = ({ selectedCountry, countries, handleCountryChange }) => {
    if (selectedCountry){
        return (
            <CountryInfo country={selectedCountry} />
        )
    }

    // Empty search bar
    if (countries.length === 0) {
        return null
    }

    if (countries.length > 10) {
        return <p>Narrow your search</p>
    } else {
        return (
            <ul>
                {countries.map(country =>
                    <CountryListItem
                        key={country.numericCode}
                        country={country}
                        handleCountryChange={handleCountryChange}
                    />
                )}
            </ul>
        )
    }
}

export default SearchResults