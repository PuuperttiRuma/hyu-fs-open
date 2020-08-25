import React from 'react'

const PersonInfo = ({person}) => {
  return <li>{person.name} {person.number}</li>
}
const Phonebook = ({ persons }) => {
  return (
      <ul>
        {persons.map(person =>
          <PersonInfo person={person} key={person.name} />
        )}
      </ul>
  )
}

export default Phonebook
