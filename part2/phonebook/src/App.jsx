import React, { useState, useEffect } from 'react';
import Display from './components/People';
import ServerCom from './services/Persons';
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]); // name and number list
  const [newName, setNewName] = useState(''); //gets name
  const [newNum, setNewNum] = useState(''); //gets number
  const [look, setLook] = useState(''); //filter on name
  const [alertState, setAlertState] = useState(''); //determine if positive of negative statement
  const [alertText, setAlertText] = useState(null); //text of the error
  
  const checkPersonExist = () => persons.some(contact => contact.name.toLowerCase() === newName.toLowerCase());
  const checkNumExist = () => persons.some(contact => contact.number.toLowerCase() === newNum.toLowerCase());

  useEffect(() => {
    ServerCom.getAll()
      .then(existingContacts => {
        setPersons(existingContacts)
      })
  }, [])

  const clearAlert = () => {
    setAlertText(null);
  };

  const removePerson = id => {
    if (window.confirm('Are you sure you want to remove?')) {
      ServerCom.remove(id)
        .then(() => {
          setPersons(prevPersons => prevPersons.filter(person => person.id !== id));
        
          setAlertText(`Successfully removed ${newName} with number ${newNum} from server`);
          setAlertState('sucess')
          setTimeout(clearAlert, 5000);

        })
        .catch(error => {
          //console.error('Error removing person from server:', error);
          setAlertText(`Error removing ${newName} with number ${newNum} from server`);
          setAlertState('error')
          setTimeout(clearAlert, 5000);
        })
    }
  }
  
  const changeVal = (event,id) => {
    event.preventDefault();
    const noteObject = {
        id: id,
        name: newName,
        number: newNum
    }

    ServerCom.changeValue(noteObject)
        .then(response => {
            //console.log('Server response:', response);
            ServerCom.getAll()
              .then(existingContacts => {
                setPersons(existingContacts)

                setAlertText(`Sucess: Added new contact`);
                setAlertState('sucess')
                setTimeout(clearAlert, 5000);
            })
            setNewName('');
            setNewNum('');
        })
        .catch(error => {
          setAlertText(`Error: Adding new contact`);
          setAlertState('error')
          setTimeout(clearAlert, 5000);
          //console.error('Error adding person to server:', error);
        });
  }

  const addToServer = event => {
    event.preventDefault();

    const noteObject = {
      name: newName,
      number: newNum,
    };
    //console.log('Adding to server:', noteObject);
  
    ServerCom.create(noteObject)
      .then(response => {
        //console.log('Server response:', response);
        //console.log('Server responseid:', persons);
        // Verify the structure of the response and adjust this line accordingly
        setPersons([...persons, response]);
        setNewName('');
        setNewNum('');

        setAlertText(`Success: Adding ${newName} with number ${newNum} to server`);
        setAlertState('sucess')
        setTimeout(clearAlert, 5000);
      })
      .catch(error => {
        setAlertText(`Error: Adding ${newName} with number ${newNum} to server`);
        setAlertState('error')
        setTimeout(clearAlert, 5000);
        //console.error('Error adding person to server:', error);
      });
  }
  
  const handleAddPerson = (event) => {
    event.preventDefault();

    if ( newName==="") {
      setAlertText(`Please enter a name`);
      setAlertState('error');
      setTimeout(clearAlert, 5000);
      //console.log("alertState: ",alertState);
      return
    }

    if( newNum===""){
      setAlertText(`Please enter a number`);
      setAlertState('error')
      setTimeout(clearAlert, 5000);
      return
    }
    if (!checkPersonExist() || !checkNumExist()) { //IF ONE OF THEM DOSENT EXIST->CHANGE NUM OR CHANGE NAME OR ADD
      if(checkPersonExist()){
        const noteId = persons.find(n => n.name.toLowerCase() === newName.toLowerCase());
        if(confirm(`Name already exist\nDo you want to change the number for ${noteId.name}\nFrom: ${noteId.number}\nTo: ${newNum}`)){
          //console.log("NoteID is:", noteId);
          changeVal(event, noteId.id);
          return;
        }
      }
      if(checkNumExist()){
        const noteId = persons.find(n => n.number.toLowerCase() === newNum.toLowerCase());
        if(confirm(`Number already exist\nDo you want to change the name for number: ${noteId.number}\nFrom: ${noteId.name}\nTo: ${newName}`)){
          //console.log("NoteID is:", noteId);
          changeVal(event, noteId.id);
          return;
        }
      }

      if (!checkPersonExist() && !checkNumExist()) {
        addToServer(event);
      }
    } else {
      setAlertText(`Name ${newName} with number ${newNum} was already added to server`);
      setAlertState('error')
      setTimeout(clearAlert, 5000);
    }
  }

  const handleNumChange = (event) => {
    //console.log(event.target.value);
    setNewNum(event.target.value);
  }

  const handleNameChange = (event) => {
    //console.log(event.target.value);
    setNewName(event.target.value);
  }

  const handleSearth = (event) => {
    //console.log(event.target.value);
    setLook(event.target.value);
  }

  const filteredPersons = persons.filter(contact =>
    contact.name.toLowerCase().includes(look.toLowerCase())
  );//SEARTH ON NAME

  return (
    <div>
      <h1>Phonebook</h1>
      <Display.Notification message={alertText} type={alertState} />
      <Display.TextBox onChange={handleSearth} text="Searth" />
      <h2>Add a new</h2>
      <form onSubmit={handleAddPerson}>
        <Display.TextBox onChange={handleNameChange} text="Name" />
        <Display.TextBox onChange={handleNumChange} text="Number" />
        <Display.Button type="submit" text="Submit" />
      </form>
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map((person, index) => (
        <li key={index}>
        {person.name} - {person.number}
        <Display.RemoveButton removePerson={removePerson} id={person.id} text="Remove" />
        </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
