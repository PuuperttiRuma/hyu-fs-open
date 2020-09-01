import React from 'react'

const Notification = ({ message }) => {
  const dbNotificationStyle = {
    color: 'green',
    fontSize: 18,
    borderStyle: 'solid',
    borderRadius: 5,
    marginBottom: 10,
    padding: 5
  }
  if (message === null) {
    return null
  }
  return (
    <div style={dbNotificationStyle} className="databaseMessage">{message}</div>
  )
}

const AddName = ({
  addPerson,
  message,
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        <Notification message={message} />
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
