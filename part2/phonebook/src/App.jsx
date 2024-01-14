import React, { useState,useEffect } from 'react';
import Note from './components/Notes';
import ServerCom from './services/Persons';

const TextBox = (props) => (
  <div>
    <input placeholder={props.text} onChange={props.onChange} />
  </div>
);

const RemoveButton = (props) => {
  return (
    <button onClick={() => props.removePerson(props.id)}>
      {props.text}
    </button>
  );
};

const Button = (props) => (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
);

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNum, setNewNum] = useState('');
  const [look, setLook] = useState('');

  const checkPersonExist = () => persons.some(contact => contact.name.toLowerCase() === newName.toLowerCase());
  const checkNumExist = () => persons.some(contact => contact.number.toLowerCase() === newNum.toLowerCase());

  useEffect(() => {
    ServerCom
      .getAll()
      .then(existingContacts => {
        setPersons(existingContacts)
      })
  }, [])

  const removePerson = id => {
    if (window.confirm('Are you sure you want to remove?')) {
      ServerCom.remove(id)
        .then(() => {
          setPersons(prevPersons => prevPersons.filter(person => person.id !== id));
        })
        .catch(error => {
          console.error('Error removing person from server:', error);
        })
    }
  }

  const addToServer = event => {
    event.preventDefault();
  
    const noteObject = {
      name: newName,
      number: newNum,
    };
  
    console.log('Adding to server:', noteObject);
  
    ServerCom.create(noteObject)
      .then(response => {
        console.log('Server response:', response);
        console.log('Server responseid:', persons);
        // Verify the structure of the response and adjust this line accordingly
        setPersons([...persons, response]);
  
        setNewName('');
        setNewNum('');
      })
      .catch(error => {
        console.error('Error adding person to server:', error);
      });
  };
  
  const handleAddPerson = (event) => {
    event.preventDefault();
    if (!checkPersonExist() || !checkNumExist()) {
      if(checkPersonExist()){
        if(confirm(`Name already exist\nDo you want to change the number for ${newName} to ${newNum}`)){
          const note = persons.find(n => n.name === newName)
          console.log("checking for",note)
          removePerson(note.id)
          .then(() => {
            // After the removal is complete, add the new person
            addToServer(event);
          })
          return;
        }
      }

      if(checkNumExist()){
        if(confirm(`Number already exist\nDo you want to change the name for number ${newNum} to ${newName}`)){
          editValueInServer(event);
          return;
        }
      }

      if (!checkPersonExist() && !checkNumExist()) {
        addToServer(event);
      }
    } else {
      alert(`${newName} is already added to the phonebook`);
    }
  };

  const handleNumChange = (event) => {
    console.log(event.target.value);
    setNewNum(event.target.value);
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

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
        <li key={index}>
        {person.name} - {person.number}
        <RemoveButton removePerson={removePerson} id={person.id} text="Remove" />
        </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
