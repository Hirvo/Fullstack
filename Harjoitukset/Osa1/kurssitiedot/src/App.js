import React from 'react'

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course}/>
      <Content parts={parts}/>
      <Total parts={parts}/>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>
        Number of exercises {props.parts[0].exercises
        +props.parts[1].exercises+props.parts[2].exercises}
      </p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part name={props.parts[0].name} exerecise={props.parts[0].exercises}/>
      <Part name={props.parts[1].name} exerecise={props.parts[1].exercises}/>
      <Part name={props.parts[2].name} exerecise={props.parts[2].exercises}/>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.name} {props.exerecise}
      </p>
    </div>
  )
}

const Header = (props) => {
    return <h1>{props.course}</h1>
}

export default App