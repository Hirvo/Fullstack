import React from 'react'

const Course = ({course}) => {

    const Content = (props) => {
      return (
        <div>
            {props.parts.map(course =>
          <Part key={course.id}>
            {course.name} 
            {course.exercises}
          </Part>
        )}
        </div>

      )
    }
    
    const Part = (props) => {
      return (
          <p>
            {props.children[0]} {props.children[1]}
          </p>
      )
    }
    
    const Header = (props) => {
        return <h2>{props.course}</h2>
    }
  
    const Total = (props) => {
      const total = props.parts.reduce(
        (prevValue, currentValue) => prevValue + currentValue.exercises,
        0
      )
      return (
        <p>
          <b>total of {total} exercises</b>
        </p>
      )         
  }

    return (
      <div>
        <h1>Web development curriculum</h1>
        <Header course={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </div>
    )
  }

export default Course