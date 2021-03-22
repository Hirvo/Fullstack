import React from 'react'

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  

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


    return ( 
      <div>      
      {courses.map(course =>
        <Course key={course.id}
          course={course} />
      )}
      </div> 
  )
}


export default App