import React, { useState } from 'react';

const DisplayPercent = (props) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>{props.text}</td>
          <td>{props.value}</td>
          <td>%</td>
        </tr>
      </tbody>
    </table>
  )
}

const StatisticsLine = (props) => {
  return (
    <table> 
      <tbody>
        <tr>
          <td>{props.text}</td>
          <td>{props.value}</td>
        </tr>
      </tbody>
    </table>
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
  const totalClicks = props.good + props.neutral + props.bad;
  if(totalClicks>0){
  return (
    <div>
      <StatisticsLine value={props.good} text="good" />
      <StatisticsLine value={props.neutral} text="neutral" />
      <StatisticsLine value={props.bad} text="bad" />
      <StatisticsLine value={totalClicks} text="total clicks" />
      <StatisticsLine
        value={((props.good - props.bad) / (totalClicks)).toFixed(1)}
        text="average"
      />
      <DisplayPercent
        value={((props.good) / (totalClicks)*100).toFixed(1)}
        text="positive"
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
  })
  const handleGoodClick = () => {
    setClicks({ 
      good: clicks.good+1,
      neutral: clicks.neutral,
      bad: clicks.bad })
  }

  const handleNeutralClick = () => {
    setClicks({
      good: clicks.good,
      neutral: clicks.neutral+1,
      bad: clicks.bad })
  }

  const handleBadClick = () => {
    setClicks({ 
      good: clicks.good,
      neutral: clicks.neutral,
      bad: clicks.bad+1 });
  }

  return (
    <div>
      <Header name={headerNames[0]} />
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />
      <Header name={headerNames[1]} />
      <Statistics good={clicks.good} neutral={clicks.neutral} bad={clicks.bad} />
    </div>
  )
}

export default App;
