import React, { useState } from 'react';

const DisplayPercent = (props) => {
  return (
    <div>{props.text} {props.value ? `${props.value}%` : '-'}</div>
  )
}

const Display = (props) => {
  return (
    <div>{props.text} {props.value}</div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const Header = ({ name }) => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}

const Statistics = (props) => {
  const { good, neutral, bad } = props;
  const totalClicks = good + neutral + bad;
  if(totalClicks>0){
  return (
    <div>
      <Display value={good} text="good" />
      <Display value={neutral} text="neutral" />
      <Display value={bad} text="bad" />
      <Display value={totalClicks} text="total clicks" />
      <DisplayPercent
        value={totalClicks > 0 ? ((good - bad) / (totalClicks-neutral)) * 100 : 0}
        text="average"
      />
    </div>
    )
  }else{
    return(
    <div>No feedback  given</div>
    )
  }
}

const App = () => {
  const headerNames = ['give feedback', 'statistics'];

  const [clicks, setClicks] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });
  const a=0
  const handleGoodClick = () => {
    setClicks({ ...clicks, good: clicks.good + 1 });
  };

  const handleNeutralClick = () => {
    setClicks({ ...clicks, neutral: clicks.neutral + 1 });
  };

  const handleBadClick = () => {
    setClicks({ ...clicks, bad: clicks.bad + 1 });
  };

  return (
    <div>
      <Header name={headerNames[0]} />
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />
      <Header name={headerNames[1]} />
      <Statistics {...clicks} />
    </div>
  );
};

export default App;
