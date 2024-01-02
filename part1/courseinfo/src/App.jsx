const Header = ({ name }) => {
  return (
    <div>
      <h1>
        {name}
      </h1>
    </div>
  )
}

const Content = ({ parts }) => {
  return(
    <div>
      <ContentHelper name={parts[0].name} value={parts[0].exercises} /> 
      <ContentHelper name={parts[0].name} value={parts[0].exercises} /> 
      <ContentHelper name={parts[0].name} value={parts[0].exercises} /> 
      </div>
  )
}
const ContentHelper=content=>{
  //console.log(content.name)
  return (
    <div>
      <p>
       {content.name} {content.value}
      </p>
    </div>
  )
}

const Total = ({ parts }) => {
  return (
    <div>
      <p>
        Number of exercises {parts[0].exercises+parts[1].exercises+parts[2].exercises}
      </p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
      <p></p>
    </div>
  )
}

export default App
