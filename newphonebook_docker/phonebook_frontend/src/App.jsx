import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import PhoneService from './services/phonebook'
import Notifications from './components/Notifications'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([])
  const [notification, setNotification] = useState({ message: '', type: '' })

  useEffect(() => {
    PhoneService
      .getAll()
      .then((data) => {
        setPersons(data)
      })
  }, [])

  // Update filtered results when persons or filter changes
  useEffect(() => {
    if (filter !== '') {
      setFilteredPersons(persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase())))
    }
  }, [persons, filter])

  const handleSubmit = (e) => {
    e.preventDefault()
    // check duplicate name

    if (persons.find((person) => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personToUpdate = persons.find((person) => person.name === newName)
        PhoneService
          .updateContact(personToUpdate.id, { name: newName, number: newNumber })
          .then((data) => {
            setPersons(persons.map((person) => person.id !== personToUpdate.id ? person : data))
            setNewName('')
            setNewNumber('')
            setNotification({ message: 'Contact ' + newName + ' is updated', type: 'success' })
          })
          .catch((error) => {
            if (error.response.status === 404) {
              setNotification({ message: 'Information of ' + newName + ' is already been removed from server', type: 'error' })
            }

          })
      }
    } else {
      PhoneService
        .create({ name: newName, number: newNumber })
        .then((data) => {
          setPersons([...persons, data])
          setNewName('')
          setNewNumber('')
          setNotification({ message: 'Contact ' + newName + ' is added', type: 'success' })
        })
        .catch((error) => {
          console.log(error.response.data)
          setNotification({ message: error.response.data.error, type: 'error' })
        })
    }
    setTimeout(() => {
      setNotification({ message: '', type: '' })
    }, 5000)
  }


  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }



  const deletePerson = (id) => {
    if (window.confirm('Are you sure you want to delete this person?')) {
      PhoneService
        .deleteContact(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id))
          setNotification({ message: 'Contact is deleted', type: 'success' })
          setTimeout(() => {
            setNotification({ message: '', type: '' })
          }, 5000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notifications message={notification.message} type={notification.type} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} handleSubmit={handleSubmit} />
      <h2>Numbers</h2>
      <Persons persons={filter === '' ? persons : filteredPersons} deletePerson={deletePerson} />
    </div>
  )
}


export default App