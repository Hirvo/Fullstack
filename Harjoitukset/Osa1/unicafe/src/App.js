import React, { useState } from 'react'





const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
   setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad (bad + 1)
  }
  return (
    <div>
       <h1>give feedback</h1>
      <div>        
        <Button handleClick={handleGoodClick} text='Good' />
        <Button handleClick={handleNeutralClick} text='Neutral' />
        <Button handleClick={handleBadClick} text='Bad' />
      </div>
      <h1>statistics</h1>
      <div>   
        <p> good {good} <br />
        neutral {neutral} <br />
        bad {bad}  <br />
        </p>  
    
      </div>      
    </div>
  )
}

export default App