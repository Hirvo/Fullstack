import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Person = ({ person, deletePerson}) => {
  return (
    <li>{person.name} {" "}
    {person.number} {" "}
    <button onClick={() => deletePerson(person)}>
          delete 
        </button>
    </li>
  )
}

const Notification = ({ message: notification }) => {
  if (notification === null) {
    return null
  }

  return (
    <div className="notification">
      {notification}
    </div>
  )
}

const Error = ({ message: error }) => {
  if (error === null) {
    return null
  }

  return (
    <div className="error">
      {error}
    </div>
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
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
      updatePerson(personObject);
    }
    else {
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('') 
        setNewNumber('')
        }).then(Notification => {
          setNotificationMessage(
            `Added '${personObject.name}'`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)          
        })    
      } 
  } 

const filtering = persons.filter(person => {  
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

const removePerson = ( id ) => {  
  setPersons(persons.filter(n => n.id !== id))  
}

const deletePerson = ( person ) => {
  if (window.confirm(`delete ${person.name}?`)){
    personService
    .personDelete(person.id)
    .then(result => {
      setNotificationMessage(
        `Deleted '${person.name}'`);
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000);
        removePerson(person.id);    
    })
    .catch(error => { 
      setErrorMessage(
        `'${person.name}' was already removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    });        
    }
  } 

const updatePerson = ( person ) => {
  const findPerson = persons.find(n => n.name === person.name)
  const newPerson =  { ...findPerson, number: person.number }
  
  if (window.confirm(`${newPerson.name} is already in the
  phonebook, replace the old number with the new one?`)){
    personService
    .update(newPerson.id, newPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id 
          !== newPerson.id ? person : returnedPerson));
          setNotificationMessage(
            `Updated the number of '${person.name}'`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)          
           
      })
    }  
  } 
      

  return (
    <div>
       <Notification message={notificationMessage} />
       <Error message={errorMessage} />
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
          <Person key={person.name} person={person} 
          deletePerson={deletePerson}
          />
        )}
      </ul>
    </div>
  )

}

export default App
