import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Mostvoted = ({anectodes, votes}) => {
var largest= 0;
var indecs = 0;

for (let i=0; i<=largest;i++){
    if (votes[i]>largest) {
        largest=votes[i];
        indecs = i;
    }
}
return (
  <div>   
  {anectodes[indecs]}
  </div>
)
 

}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]


  
  const [points, setVote] = useState(Array(anecdotes.length).fill(0))
   
  const [selected, setSelected] = useState(0)

  const handleNextClick = () => {
    setSelected([Math.floor(Math.random() * anecdotes.length)]) 
   }

   const handleVoteClick = () => {
    const copy = [...points]
    copy[selected] += 1  
    setVote(copy)
   }



  return (
    <div>
      <h1>Anectode of the day</h1>
      {anecdotes[selected]} <br />
      Has {points[selected]} votes <br />
      <Button handleClick={handleVoteClick} text='Vote' />
      <Button handleClick={handleNextClick} text='Next anectode' />
      <h1>Anectode with the most votes</h1>
      <Mostvoted anectodes={anecdotes} votes= {points} />
    </div>
  )
}

export default App
