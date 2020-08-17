import React from 'react'

/**
 * 
 * @param {string} header Title of the course
 */
const Header = ({ header }) => {
    return <h1>{header}</h1>;
}

/**
 * Renders the contents of the course as a ul
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
 * Renders one lesson of the course as li
 * @param {Object} part Lesson of the course
 */
const Part = ({ part }) => {
    return (
        <li>
            {part.name} {part.exercises}
        </li>
    )
}

const Total = ({ parts }) => {
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

export default Course