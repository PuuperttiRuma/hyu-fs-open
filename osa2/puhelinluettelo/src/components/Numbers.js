import React from 'react'

const PersonInfo = ({person, deletePerson}) => {
  return (
    <li>
      {person.name} {person.number}
      <button 
        onClick={() => deletePerson(person.id)}
      >
        delete
      </button>
    </li>)
}

const Phonebook = ({ persons, deletePerson }) => {
  return (
      <ul>
        {persons.map(person =>
          <PersonInfo 
            person={person} 
            key={person.id}
            deletePerson={deletePerson}
          />
        )}
      </ul>
  )
}

export default Phonebook
