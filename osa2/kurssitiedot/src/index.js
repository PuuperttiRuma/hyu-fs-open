import React from 'react';
import ReactDOM from 'react-dom';

/**
 * 
 * @param {string} header Title of the course
 */
const Header = ({ header }) => {
  return <h1>{header}</h1>;
}

/**
 * Renders the contents of the course as a <ul>
 * @param {array} parts Lessons included in the Course
 */
const Content = ({ parts }) => {
  return (
    <ul>
      {parts.map(part =>
        <Part key={part.id} part={part} />
      )}
    </ul>
  )
}

/**
 * Renders one lesson of the course as <li>
 * @param {Object} part Lesson of the course
 */
const Part = ({ part }) => {
  return (
    <li>
      {part.name} {part.exercises}
    </li>
  )
}

const Total = ({parts}) => {
  const totalExercises = parts.reduce((sum, part) => sum += part.exercises, 0)
  return (
    <p>Number of exercises {totalExercises}</p>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header header={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
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
        name: 'Debug lesson for debugging',
        exercises: 2,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))