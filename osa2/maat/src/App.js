import React, { useState, useEffect } from 'react'
import axios from 'axios'

import SearchResults from './components/SearchResults'

const App = () => {
  const [data, setData] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [searchWord, setSearchWord] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  //Data fetching
  useEffect(() => {
    console.log('effect');
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setData(response.data)
        //console.log(response.data);
      })
  }, [])

  const handleSearch = (e) => {
    // console.log(e.target.value);
    setSearchWord(e.target.value.toLowerCase())
  }

  /**
   * When search word changes filter the countries according
   * the country's name.
   * I don't know whether it is a good idea or not to
   * have this as an effect.
  */
  useEffect(() => {
    if (searchWord === '') return
    const newFilteredCountries = data.filter((country => {
      return(
        country.name
          .toLowerCase()
          .includes(searchWord)
      )      
    }))
    //console.log(newFilteredCountries)

    //Set the selected country
    const selected = newFilteredCountries.length === 1 
      ? newFilteredCountries[0] 
      : null
    setSelectedCountry(selected)

    setFilteredCountries(newFilteredCountries) //eslint-disable-next-line
  }, [searchWord]) 

  const handleCountryChange = (country) => {
    console.log(country)
    setSelectedCountry(country)
    setSearchWord('')
  }

  return (
    <div>
      find countries
      <input type="text" value={searchWord} onChange={handleSearch} />
      <SearchResults
        selectedCountry={selectedCountry}
        countries={filteredCountries} 
        handleCountryChange={handleCountryChange}
      />
    </div>
  );
}

export default App;
