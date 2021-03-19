import React, { useState } from 'react'





const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({ text, value }) => {
  if (text === "positive")
    return(  
      <tr>
        <td> {text} </td>
        <td> {value} % </td>
      </tr> 
    )
  else
    return(  
      <tr>
        <td> {text} </td>
        <td> {value} </td>
      </tr>
    )
}

const Statistics = ({ good, bad, neutral }) => {
  if (good+bad+neutral === 0)
    return (
      <div>   
        <p> 
          no feedback given
        </p>  
      </div>   
    )
  else 
    return(
      <table>
        <tbody>
        <StatisticLine text="good" value ={good}/> 
        <StatisticLine text="neutral" value ={neutral}/> 
        <StatisticLine text="bad" value ={bad}/> 
        <StatisticLine text="all" value ={bad+good+neutral}/> 
        <StatisticLine text="average" 
        value ={(good-bad)/(bad+good+neutral)}/> 
        <StatisticLine text="positive" 
        value ={100*good/(bad+good+neutral) }/> 
        </tbody>
      </table>
    )
}

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
      <Statistics good={good} bad={bad} neutral={neutral} />  
    </div>
  )
}

export default App