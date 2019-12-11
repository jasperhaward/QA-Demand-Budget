import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Container,
    Button,
    Table
} from 'reactstrap';

const Person = props => (
    <tr>
      <td>{props.person.person}</td>
      <td>{props.person.rate}</td>
      <td>{props.person.devRatio * 100}%</td>
      <td>{props.person.workRatio * 100}%</td>
      <td>
        <Link to={"/devs/edit/"+props.person._id}>edit</Link> | <button onClick={() => { props.deletePerson(props.person._id) }}>delete</button>
      </td>
    </tr>
  )

export default class DevDisplay extends Component { 
    constructor(props) {
        super(props);
        
        this.deletePerson = this.deletePerson.bind(this)
    
        this.state = {people: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/people/retrieve')
          .then(response => {
            this.setState({ people: response.data })
          })
          .catch((error) => {
            console.log(error);
          })
      }

      deletePerson(id) {
        axios.delete('http://localhost:5000/people/'+id)
          .then(response => { console.log(response.data)});
    
        this.setState({
          people: this.state.people.filter(el => el._id !== id)
        })
      }


      peopleList() {
        return this.state.people.map(currentperson=> {
          return <Person person={currentperson} deletePerson={this.deletePerson} key={currentperson._id}/>;
        })
      }


    render(){
        console.log(this.state.people)
        return (
            <Container>
                <div>
                    <h3>People working</h3>
                    <br/>
                    <Table>
                    <thead className="thead-light">
                        <tr>
                        <th>Name</th>
                        <th>Rate</th>
                        <th>Developer Ratio</th>
                        <th>Work Ratio</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.peopleList() }
                    </tbody>
                    </Table>
                </div>
                <Link to={"/devs/add/"}><Button style={{float : "right"}}>Add new person</Button></Link>
            </Container>
        )}
}
