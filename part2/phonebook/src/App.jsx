import React, { useState } from 'react';

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState('');
  const [newNum, setNewNum] = useState('');
  const [look, setLook] = useState('');

  const handleNumChange = (event) => {
    console.log(event.target.value);
    setNewNum(event.target.value);
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const checkExist = () => persons.some(contact => contact.name.toLowerCase() === newName.toLowerCase());

  const handleAddPerson = (event) => {
    event.preventDefault();

    if (!checkExist()) {
      setPersons([...persons, { name: newName, number: newNum }]);
      setNewName('');
      setNewNum('');
    } else {
      alert(`${newName} is already added to the phonebook`);
    }
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
          <li key={index}>{person.name} - {person.number}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
