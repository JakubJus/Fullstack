
const TextBox = (props) => (
  <div>
    <input placeholder={props.text} onChange={props.onChange} />
  </div>
)
  
const RemoveButton = (props) => {
  return (
    <button onClick={() => props.removePerson(props.id)}>
      {props.text}
    </button>
  )
}
  
const Button = (props) => {
  return(
  <button onClick={props.handleClick}>
    {props.text}
  </button>
  )
  }

  const Notification = ({ message, type }) => {
    if (message === null) {
      return null;
    }
    //console.log("type: ",type)
    
    return (
      <div className={type}>
        {message}
      </div>
    );
  };

export default {TextBox,RemoveButton,Button,Notification};
