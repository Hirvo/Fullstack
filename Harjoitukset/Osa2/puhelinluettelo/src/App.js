import React, { useState } from 'react'

const Person = ({ person }) => {
  return (
    <li>{person.name}</li>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName, 
    }

    setPersons(persons.concat(personObject))
    setNewName('')
}

const handlePersonsChange = (event) => {
  console.log(event.target.value)
  setNewName(event.target.value)
}

  return (
    <div>
      <h2>Phonebook</h2>
      <div>debug: {newName}</div>

      <form onSubmit={addName}>
        <div>
          name:   <input value={newName} 
        onChange={handlePersonsChange} 
        />
        </div>   

        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
          {persons.map(person =>
          <Person key={person.name} person={person} />
        )}
      </ul>
    </div>
  )

}

export default App
