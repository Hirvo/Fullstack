import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Person = ({ person }) => {
  return (
    <li>{person.name} {" "}
    {person.number}
    </li>
  )
}

const Filter = (props) => {
  return (
    <div>        
      filter shown with <input value={props.newFilter} 
      onChange={props.handler}/>
      </div> 
  )
}

const PersonFrom = (props) => {
  return (
    <form onSubmit={props.addName}>
    <div>
      name:   <input value={props.newName} 
    onChange={props.nameHandler}/>
    </div>   
    <div>
      number:   <input value={props.newNumber} 
    onChange={props.numberHandler}/>
    </div>   
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

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
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('') 
        setNewNumber('')
        })    
      } 
  }

const filtering = persons.filter(person => {  
  console.log(person.name)
  return (person.name.toLowerCase().includes(newFilter)
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

      <Filter filter1={newFilter} handler={handleFilterChange} />
          
      <h2>add a new</h2>

      <PersonFrom addName={addName} 
      newName={newName}
      nameHandler={handlePersonsChange} 
      newNumber={newNumber}
      numberHandler={handleNumberChange}/>
      
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
