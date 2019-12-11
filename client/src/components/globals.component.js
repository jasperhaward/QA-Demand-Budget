import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Container,
    Table
} from 'reactstrap';

const Global= props => (
    <tr>
      <td>{props.global.name}</td>
      <td>{props.global.value}</td>
      <td>
        <Link to={"/globals/edit/"+props.global._id}>edit</Link> 
      </td>
    </tr>
  )

export default class GlobalsDisplay extends Component { 
    constructor(props) {
        super(props);
    
    
        this.state = {globals: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/globals/retrieve')
          .then(response => {
            this.setState({ globals: response.data })
          })
          .catch((error) => {
            console.log(error);
          })
      }

      globalsList() {
        return this.state.globals.map(currentglobal=> {
          return <Global global={currentglobal} key={currentglobal._id}/>;
        })
      }

    render(){
        return (
            <Container>
                <div>
                    <h3>Budget globals</h3>
                    <br/>
                    <Table>
                    <thead className="thead-light">
                        <tr>
                        <th>Name</th>
                        <th>Value</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.globalsList() }
                    </tbody>
                    </Table>
                </div>
            </Container>
        )}

}