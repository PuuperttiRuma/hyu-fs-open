import React from 'react'

const PersonInfo = ({ person, handleDeletePerson }) => {
  return (
    <li>
      {person.name} {person.number}
      <button onClick={() => handleDeletePerson(person.id)}>delete</button>
    </li>
  )
}

const Phonebook = ({ persons, handleDeletePerson }) => {
  return (
    <ul>
      {persons.map((person) => (
        <PersonInfo
          person={person}
          key={person.id}
          handleDeletePerson={handleDeletePerson}
        />
      ))}
    </ul>
  )
}

export default Phonebook
