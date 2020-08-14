import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max))
}

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(getRandomInt(anecdotes.length))
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))
  const [mostVoted, setMostVoted] = useState(0)

  const setVisibleAnecdote = () => {
    let x
    do{
       x = getRandomInt(anecdotes.length)
    } while (x === selected)   
    setSelected(x)
  }

  const voteAnecdote = () => {
    const pointsCopy = [...points]
    pointsCopy[selected] += 1

    let maxIndex = mostVoted
    for (let index = 0; index < pointsCopy.length; index++) {
      if (pointsCopy[index] > pointsCopy[maxIndex]){
        maxIndex = index
      }
    }
    
    setMostVoted(maxIndex)
    setPoints(pointsCopy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <button onClick={voteAnecdote}>Vote for the anecdote</button>
      <button onClick={setVisibleAnecdote}>Next anecdote</button>
      <h1>Anecdote with the most votes</h1>
      <p>{anecdotes[mostVoted]}</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)