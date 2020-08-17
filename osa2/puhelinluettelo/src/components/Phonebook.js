import React from 'react'

const PersonInfo = ({person}) => {
  return <li>{person.name} {person.number}</li>
}
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

export default Phonebook
