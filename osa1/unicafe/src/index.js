import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return (
      <>
        <h1>Statistics</h1>
        <p>No feedback give</p>
      </>
    )
  }
  return (
    <>
      <h1>Statistics</h1>
      <StatLine text="Good" value={good} />
      <StatLine text="Neutral" value={neutral} />
      <StatLine text="Bad" value={bad} />
      <StatLine text="All" value={good + neutral + bad} />
      <StatLine text="Average" value={((good - bad) / (good + neutral + bad)).toFixed(2)} />
      <StatLine text="Positive" value={(good / (good + neutral + bad) * 100).toFixed(0)} />
    </>
  )
}

const StatLine = ({text, value}) => {
  if (text === "Positive"){
    return <p>{text} {value}%</p>  
  }
  return <p>{text} {value}</p>
}

const Button = (props) => {

}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={() => setGood(good + 1)}>Good</button>
      <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
      <button onClick={() => setBad(bad + 1)}>Bad</button>

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />

    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);