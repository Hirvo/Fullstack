import React, { useState } from 'react'

const Person = ({ person }) => {
  return (
    <li>{person.name} {" "}
    {person.number}
    </li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName, 
      number: newNumber
    }
        
    if (persons.some(person => person.name === (newName))) {
      window.alert(`${newName} is already added to phonebook`);
    }
    else {
      setPersons(persons.concat(personObject))
      setNewName('')      
    }
     
}

const filtering = persons.filter(person => {
  return Object.keys(person).some(key =>
    person[key].toLowerCase().includes(newFilter)
  );
});

const handlePersonsChange = (event) => {
  setNewName(event.target.value)
}

const handleNumberChange = (event) => {
  setNewNumber(event.target.value)
}

const handleFilterChange = event => {
  setNewFilter(event.target.value.toLowerCase());
};

  return (
    <div>
      <h2>Phonebook</h2>
      
      <div>
        filter shown with <input value={newFilter} 
      onChange={handleFilterChange}/>
      </div>  
    
      <h2>add a new</h2>
      <div>debug: {newName}</div>

      <form onSubmit={addName}>
        <div>
          name:   <input value={newName} 
        onChange={handlePersonsChange}/>
        </div>   
        <div>
          number:   <input value={newNumber} 
        onChange={handleNumberChange}/>
        </div>   
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
          {filtering.map(person =>
          <Person key={person.name} person={person} />
        )}
      </ul>
    </div>
  )

}

export default App
