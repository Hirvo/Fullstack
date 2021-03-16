import React from 'react'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course}/>
      <Content name1={part1} exercises1={exercises1}
      name2={part2} exercises2={exercises2}
      name3={part3} exercises3={exercises3}/>
      <Total number={exercises3+exercises1+exercises2}/>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>
        Number of exercises {props.number}
      </p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part name={props.name1} exerecise={props.exercises1}/>
      <Part name={props.name2} exerecise={props.exercises2}/>
      <Part name={props.name3} exerecise={props.exercises3}/>
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