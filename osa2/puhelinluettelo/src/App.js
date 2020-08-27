import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Numbers from './components/Numbers'
import AddName from './components/AddName'
import SearchBar from './components/SearchBar'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([])

  useEffect(() => {
    console.log("Effect");
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        // const fetchedPersons = response.data
        console.log(response.data)
        setPersons(response.data)
        setFilteredPersons(response.data)
      })
  }, [])


  const addPerson = (e) => {
    e.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }

    if (persons.some(person => person.name === newPerson.name)) {
      alert(`${newName} is already in the phonebook`)
      return
    }

    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleSearchChange = (e) => {
    setSearchName(e.target.value)
    if (e.target.value === "") {
      setFilteredPersons(persons)
      return
    }
    const newFiltered = persons.filter((person =>
      person.name.toLowerCase().includes(e.target.value.toLowerCase())))
    setFilteredPersons(newFiltered)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Add a new name</h2>
      <AddName
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <SearchBar
        searchName={searchName}
        handleSearchChange={handleSearchChange}
      />
      <Numbers persons={filteredPersons} />
    </div>
  )

}

export default App