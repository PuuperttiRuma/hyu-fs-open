import React from 'react'

const CountryInfo = ({country}) => {
    return (
        <>
            <h1>{country.name}</h1>
            Capital: {country.capital} <br />
            Population: {country.population} <br />
            <h3>Languages</h3>
            <ul>
                {country.languages.map((language, i) =>
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

export default CountryInfo