import React, { Component } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Container,
    Form,
    Input,
    Button
} from 'reactstrap';

export default class GlobalsEditDisplay extends Component { 
    constructor(props) {
        super(props);
        
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeValue = this.onChangeValue.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
            name: '',
            value: 0
          }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/globals/'+this.props.match.params.id)
          .then(response => {
            this.setState({
              name: response.data.name,
              value: response.data.value
            })   
          })
          .catch(function (error) {
            console.log(error);
          })
      }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }

    onChangeValue(e) {
        this.setState({
            value: e.target.value
    })
    }

    onSubmit(e) {
        e.preventDefault();
    
        const global = {
          name: this.state.name,
          value: this.state.value
        }
    
        axios.post('http://localhost:5000/globals/update/' + this.props.match.params.id, global)
          .then(res => console.log(res.data));
    
        window.location = '/globals';
      }

      render(){
        return (
            <Container>
                <h3>Edit Global</h3>
                <Form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                    <label>Name: </label>
                    <Input  type="text"
                        required
                        className="form-control"
                        value={this.state.name}
                        onChange={this.onChangeName}
                        />
                    </div>
                    <div className="form-group"> 
                    <label>Value: </label>
                    <Input  type="number" step="1"
                        required
                        className="form-control"
                        value={this.state.value}
                        onChange={this.onChangeValue}
                        />
                    </div>
                    <div className="form-group">
                    <Button type="submit" >Edit Global </Button>
                    </div>
                </Form>
            </Container>
        )}
}