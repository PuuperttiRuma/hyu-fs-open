import React, { useState } from 'react'

const Phonebook = ({ persons }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <PersonInfo person={person} key={person.name} />
        )}
      </ul>
    </div>
  )
}

const PersonInfo = ({person}) => {
  return <li>{person.name}</li>
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const addPerson = (e) => {
    e.preventDefault()
    const newPerson = {
      name: newName
    }   
    
    if (persons.some(person => person.name === newPerson.name)){
      alert(`${newName} is already in the phonebook`)
    } 
    else{
      setPersons(persons.concat(newPerson))
      setNewName('')
    }
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name:
          <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <Phonebook persons={persons} />
    </div>
  )

}

export default App