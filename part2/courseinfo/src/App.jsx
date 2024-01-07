import course from "./course";

const Header = ({ name }) => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
        {parts.map((part) => (
          <ContentHelper key={part.id} name={part.name} value={part.exercises} />
        ))}
    </div>
  )
}

const ContentHelper = (content) => {
  return (
    <div>
      <p>
        {content.name} {content.value}
      </p>
    </div>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <div>
      <p>Number of exercises {total}</p>
    </div>
  )
}

const App = () => {

return (
  <div>
    <Header name={course[0].name} />
    <Content parts={course[0].parts} />
    <Total parts={course[0].parts} />

    <Header name={course[1].name} />
    <Content parts={course[1].parts} />
    <Total parts={course[1].parts} />
  </div>
);
};

export default App;