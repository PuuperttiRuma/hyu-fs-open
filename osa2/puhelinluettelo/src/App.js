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
  const [dbMessage, setDbMessage] = useState(null)

  //#region Database functions

  //Fetch initial database
  useEffect(() => {
    dbService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
    })
  }, [])

  const addContactToDB = (newPerson) => {
    dbService
      .createPerson(newPerson)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        databaseMessage(`Added ${newPerson.name}`)
      })
  }

  const updateContactNumber = (newPerson) => {
    const personRef = persons.find(
      (person) => person.name === newPerson.name
    )
    const changedPerson = {
      ...personRef,
      number: newNumber,
    }
    dbService
      .update(changedPerson.id, changedPerson)
      .then((updatedPerson) => {
        setPersons(
          persons.map((person) =>
            person.id !== changedPerson.id
              ? person
              : updatedPerson
          )
        )
        databaseMessage(`Updated number of ${newPerson.name}`)
      })
  }

  const deletePersonFromDB = (id) => {
    const name = persons.find((person) => person.id === id)
      .name
    if (window.confirm(`Do you want to delete ${name}?`)) {
      dbService
        .deleteObject(id)
        .then(
          setPersons(
            persons.filter((person) => person.id !== id)
          ),
          databaseMessage(`Deleted ${name}`)
        )
    }
  }

  //#endregion

  //#region Event Handlers

  // Adding new contact
  const handleAddPerson = (e) => {
    e.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    //Check if new person is NOT already in the contacts, and if not add to DB
    if (
      !persons.some(
        (person) => person.name === newPerson.name
      )
    ) {
      addContactToDB(newPerson)
    } else {
      // IF the new person IS in the contacts ask if it is to updated otherwise cancel
      if (
        window.confirm(
          `${newName} is already in the phonebook, do you want to replace the old number with a new one?`
        )
      ) {
        updateContactNumber(newPerson)
      } else {
        return
      }
    }
  }

  const handleDeletePerson = (id) => {
    deletePersonFromDB(id)
  }

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
    const newFiltered = persons.filter((person) =>
      person.name.toLowerCase().includes(searchTerm)
    )
    setFilteredPersons(newFiltered)
  }, [searchTerm, persons])

  const databaseMessage = (message) => {
    setDbMessage(message)
    setTimeout(() => setDbMessage(null), 2000)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Add a new contact</h2>
      <AddName
        addPerson={handleAddPerson}
        message={dbMessage}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Contacts</h2>
      <SearchBar
        searchName={searchTerm}
        handleSearchChange={handleSearchChange}
      />
      <Numbers
        persons={filteredPersons}
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  )
}

export default App
