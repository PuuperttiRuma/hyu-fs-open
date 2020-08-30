import React, { useState, useEffect } from 'react'

import dbService from './services/puhelinluettelo'
import Numbers from './components/Numbers'
import AddName from './components/AddName'
import SearchBar from './components/SearchBar'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([])

  //#region Database functions

  //Fetch initial database
  useEffect(() => {
    dbService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  // Adding new contact
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

    dbService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }
  //#endregion

  //#region Event Handlers
  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase())
  }
  //#endregion

  // Search
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredPersons(persons)
      return
    }
    const newFiltered = persons.filter((person =>
      person
        .name
        .toLowerCase()
        .includes(searchTerm)
    ))
    setFilteredPersons(newFiltered)
  }, [searchTerm, persons])

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
        searchName={searchTerm}
        handleSearchChange={handleSearchChange}
      />
      <Numbers persons={filteredPersons} />
    </div>
  )
}

export default App