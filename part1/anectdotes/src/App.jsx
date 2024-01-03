import React, { useState } from 'react';

const Header = ({ name }) => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  );
};

const App = () => {
  const headerNames = ['anectdote of the day', 'anectdote with most votes'];

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast is to go well.'
  ];

  // Initialize points with zeros for each anecdote
  const initialPoints = Array(anecdotes.length).fill(0);
  //setting handels to points and index of both anectdotes & points
  const [points, setPoints] = useState(initialPoints);
  const [selected, setSelected] = useState(Math.floor(Math.random() * anecdotes.length));
  
  const maxIndex = points.indexOf(Math.max(...points));
  //add one to the index and move on if index to big look for modulo
  const handleClick = () => {
    setSelected((selected + 1) % anecdotes.length);
  };

  const handlePointClick = () => {
    const newPoints = [...points];
    newPoints[selected] += 1;
    setPoints(newPoints);
    
  };

  

  return (
    <div>
      <Header name={headerNames[0]} />
      <p>{anecdotes[selected]}</p>
      <p>Points: {points[selected]}</p>
      <Button onClick={handleClick} text="next" />
      <Button onClick={handlePointClick} text="vote" />
      <Header name={headerNames[1]} />
      <p>{anecdotes[maxIndex]}</p>
      <p>has {points[maxIndex]} votes</p>

    </div>
  );
};

export default App;