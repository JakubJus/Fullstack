import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Note from './components/Notes';

const TextBox = (props) => (
  <div>
    <input placeholder={props.text} onChange={props.onChange} />
  </div>
);

const Button = (props) => (
  <div>
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  </div>
);

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNum, setNewNum] = useState('');
  const [look, setLook] = useState('');

  useEffect(() => {
    console.log('effect');
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled');
        setPersons(response.data); // Fix: Use setPersons to update state
      })
  }, []);

  const handleNumChange = (event) => {
    console.log(event.target.value);
    setNewNum(event.target.value);
  };

  const addToServer = event => {
    event.preventDefault();
    const noteObject = {
      name: newName,
      number: newNum,
    };

    axios.post('http://localhost:3001/persons', noteObject)
      .then(response => {
        console.log(response);
        setPersons([...persons, response.data]);
        setNewName('');
        setNewNum('');
      })
      .catch(error => {
        console.error('Error adding person to server:', error);
      });
  }

  const handleAddPerson = (event) => {
    event.preventDefault();

    if (!checkExist()) {
      setPersons([...persons, { name: newName, number: newNum }]);
      setNewName('');
      setNewNum('');
      addToServer(event); // Fix: Invoke the function with event parameter
    } else {
      alert(`${newName} is already added to the phonebook`);
    }
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const checkExist = () => persons.some(contact => contact.name.toLowerCase() === newName.toLowerCase());

  const handleSearth = (event) => {
    console.log(event.target.value);
    setLook(event.target.value);
  };

  const filteredPersons = persons.filter(contact =>
    contact.name.toLowerCase().includes(look.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <TextBox onChange={handleSearth} text="Searth" />
      <h2>Add a new</h2>
      <form onSubmit={handleAddPerson}>
        <TextBox onChange={handleNameChange} text="Name" />
        <TextBox onChange={handleNumChange} text="Number" />
        <Button type="submit" text="Submit" />
      </form>
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map((person, index) => (
          <li key={index}>{person.name} - {person.number}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
