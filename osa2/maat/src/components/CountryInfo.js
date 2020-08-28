import React from 'react'

const Result = ({country}) => {
    //console.log(country);
    return (
        <>
            <h1>{country.name}</h1>
            Capital: {country.capital} <br />
            Population: {country.population} <br />
            <h3>Languages</h3>
            <ul>
                {country.languages.map((language,i) =>
                    <li key={language.name + i}>
                        {language.name}
                    </li>)}
            </ul>
            <img 
                src={country.flag} 
                alt={`Flag of ${country.name}`}
            />
        </>
    )
}

const CountryInfo = ({ countries }) => {
    if (countries.length === 0) {
        return null
    }

    if (countries.length > 10) {
        return <p>Narrow your search</p>
    } else if (countries.length === 1) {
        return(
            <Result country={countries[0]} />            
        )
    } else {
        return (
            <ul>
                {countries.map(country =>
                    <li key={country.numericCode}>{country.name}</li>)}
            </ul>
        )
    }
}

export default CountryInfo