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
        databaseMessage({
          text: `Added ${newPerson.name}`,
          color: 'green',
        })      
      })
      .catch(error => {
        console.log(error.response.data.error)
        databaseMessage({
          text: error.response.data.error,
          color: 'red',
        })
      })
  }

  const updateContactNumber = (person) => {
    const personRef = persons.find(
      p => p.name === person.name
    )
    const newPerson = {
      ...personRef,
      number: newNumber,
    }
    dbService
      .update(newPerson.id, newPerson)
      .then((updatedPerson) => {
        setPersons(
          persons.map((person) =>
            person.id !== newPerson.id
              ? person
              : updatedPerson
          )
        )
        databaseMessage({
          text: `Updated number of ${newPerson.name}`,
          color: 'green',
        })
      })
      .catch((error) => {
        console.error(error)
        databaseMessage({
          text: `The information of ${newPerson.name} has been removed from the server`,
          color: 'red',
        })
        console.log(person);
        setPersons(persons.filter(p => p.id !== newPerson.id))
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
          databaseMessage({
            text: `Deleted ${name}`,
            color: 'green',
          })
        )
        .catch((error) => {
          console.error(error)
          databaseMessage({
            text: `The information of ${name} has been removed from the server`,
            color: 'red',
          })
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  //#endregion

  //#region Event Handlers

  // Adding new contact
  const handleAddPerson = (e) => {
    e.preventDefault()
    if (!newName) return
    if (!newNumber) return

    const newPerson = {
      name: newName,
      number: newNumber,
    }
    //Check if new person is NOT already in the contacts, and if not add to DB
    if (!persons.some((person) => person.name === newPerson.name)) {
      addContactToDB(newPerson)
    } else {
      // IF the new person IS in the contacts ask if it is to updated otherwise cancel
      if (window.confirm(
          `${newName} is already in the phonebook, do you want to replace the old number with a new one?`
        )) {
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
    setTimeout(() => setDbMessage(null), 3000)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Add a new contact</h2>
      <AddName
        addPerson={handleAddPerson}
        dbMessage={dbMessage}
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
