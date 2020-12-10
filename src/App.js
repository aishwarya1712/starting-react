import React from "react";
import './App.css';
// import person from './MOCK_DATA.json'
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import {Button} from '@material-ui/core'
import AppAsClassComponent from './AppAsClassComponent'
//functional component
function App() {

  // we are going to filter on the records based on the firstName variable.
  // Using React Hooks 
  const [firstName, setfirstName] = React.useState("") // firstName is a state string variable, and setfirstName is a function to set that state
  const [selectedItem, setSelectedItem] = React.useState("")
  const [person, setPerson] = React.useState([]) // person is a state array variable. 

  // useEffect runs a function in reaction to a change.
  // first argument: a function. 
  // second argument: an array of values. eg= [firstName, selectedItem]. 
  // if these values change, you want the defined function to run (first arg)
  // if second arg is an empty array, the function runs ONCE when the component is loaded onto the page. 
  // Similar to componentDidMount() of Class Component
  React.useEffect( ()=>{
      fetch("/starting-react/MOCK_DATA.json")
      .then( (res)=> res.json())
      .then( (data)=> setPerson(data))
  }, [])

  const PersonRow = ({person, onSelect}) =>( // Component definition. onSelect is a custom event handler function. it is defined where the component is called.
      <>
      <tr key={person.id}>
        <td>{person.first_name}</td>
        <td>{person.email}</td>
        {/* <td><button onClick = { ()=> onSelect(person)}> Select </button></td>  click event handler for the button will call onSelect and give back the pokemon that was chosen */}
        <td>  <Button
        onClick = { ()=> onSelect(person)}
        variant="contained"
        color="primary"
        endIcon={<ControlPointIcon>Select</ControlPointIcon>}
      >Select</Button></td>
      </tr>
      </>
  )

  const PersonInfo = ({first_name, last_name, email, gender, ip_address}) =>( // here we are directly using the variables. so when this component is used, we need to spread the person object.
    first_name + " "+ last_name +" | "+ email +" | "+ gender +" | "+ ip_address
  )

  
  return (
    <div className="title">
     
      <h1> Person Search Using Functional Component</h1>
      <input value={firstName} 
      onChange={(evt) => setfirstName(evt.target.value)} type="text"/> {/* Updating value of hook when it's value changes in input box */}
      <table width="100%">
        <tbody>
        {person.filter((p)=>p.first_name.toLocaleLowerCase().includes(firstName.toLocaleLowerCase())).slice(0,20)
        .map( (p)=> (
            <PersonRow person={p} onSelect={(p)=> {setSelectedItem(p)}}/> // call the component and give the values. defining onSelect here as well.
        ))}
        </tbody>
      </table>
      {/* Displaying the selected item */}
     {selectedItem && (
       // this is another way of passing values 
       <h1> <PersonInfo {...selectedItem}/> </h1> // Spreading the selectedItem object, because the component itself takes spreaded values and not the whole object. 
     )}


     <AppAsClassComponent/>
    </div>
  );
}

export default App;
