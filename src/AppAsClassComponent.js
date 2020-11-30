import React from "react";
import './App.css';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import {Button} from '@material-ui/core'


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

//Class Component
class AppAsClassComponent extends React.Component {

    // constructor takes props as argument
    constructor(props){
        // pass props to parent class 
        super(props)

        // use state instead of react hooks
        this.state = {
            firstName: "",
            selectedItem: [],
            person: null
        }
    }
    
    // Similar to React.useEffect of functional component
    componentDidMount(){
        fetch("/starting-react/MOCK_DATA.json")
        .then( (res)=> res.json())
        .then( (data)=> this.setState({...this.state, person: data}))
    }
    // render function does not take any arguments
    render(){
        return (<div className="title">
      <h1> Person Search Using Class Component </h1>
      <input value={this.state.firstName} 
        onChange={(evt) => this.setState({
          ...this.state, //leave all other state vars as it is 
          firstName: evt.target.value})} /* Updating value of hook when it's value changes in input box */
        type="text"/> 

      <table width="100%">
        <tbody>
        {this.state.person && this.state.person.filter((p)=>p.first_name.toLocaleLowerCase().includes(this.state.firstName.toLocaleLowerCase())).slice(0,20)
        .map( (p)=> (
            <PersonRow person={p} onSelect={(p)=> {this.setState({...this.state, selectedItem: p})}}/> // call the component and give the values. defining onSelect here as well.
        ))}
        </tbody>
      </table>
      {/* Displaying the selected item */}
     {this.state.selectedItem? (
       // this is another way of passing values 
       <h1> <PersonInfo {...this.state.selectedItem}/> </h1> // Spreading the selectedItem object, because the component itself takes spreaded values and not the whole object. 
     ): ""}
    </div>)
    }

    
}

export default AppAsClassComponent;