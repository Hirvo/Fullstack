import React from 'react'

const App = () => {
  const course = {
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
        exercises: 2,
        id: 4
      }
    ]
  }



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
        return <h1>{props.course}</h1>
    }

    return (
      <div>
        <Header course={course.name}/>
        <Content parts={course.parts}/>
       
      </div>
    )
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}


export default App