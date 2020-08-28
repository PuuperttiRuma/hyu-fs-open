import React, { useState, useEffect } from 'react'
import axios from 'axios'

import CountryInfo from './components/CountryInfo'

const App = () => {
  const [data, setData] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [searchWord, setSearchWord] = useState('')

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
    setFilteredCountries(newFilteredCountries) //eslint-disable-next-line
  }, [searchWord]) 

  return (
    <div>
      find countries
      <input type="text" value={searchWord} onChange={handleSearch} />
      <CountryInfo countries={filteredCountries} />
    </div>
  );
}

export default App;
