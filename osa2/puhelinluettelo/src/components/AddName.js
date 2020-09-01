import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  const dbNotificationStyle = {
    color: message.color,
    fontSize: 18,
    borderStyle: 'solid',
    borderRadius: 5,
    marginBottom: 10,
    padding: 5
  }
  return (
    <div style={dbNotificationStyle} className="databaseMessage">{message.text}</div>
  )
}

const AddName = ({
  addPerson,
  dbMessage,
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        <Notification message={dbMessage} />
        <label>
          name:
          <input value={newName} onChange={handleNameChange} />
        </label>
      </div>
      <div>
        <label>
          number:
          <input value={newNumber} onChange={handleNumberChange} />
        </label>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default AddName
