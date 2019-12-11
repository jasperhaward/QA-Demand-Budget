import React, { Component } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Container,
    Form,
    Input,
    Button
} from 'reactstrap';

export default class DevEditDisplay extends Component { 
    constructor(props) {
        super(props);
        
        this.onChangePerson = this.onChangePerson.bind(this);
        this.onChangeRate = this.onChangeRate.bind(this);
        this.onChangeDevRatio = this.onChangeDevRatio.bind(this);
        this.onChangeWorkRatio = this.onChangeWorkRatio.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
            person: '',
            rate: '',
            devRatio: 0,
            workRatio: 0
          }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/people/'+this.props.match.params.id)
          .then(response => {
            this.setState({
              person: response.data.person,
              rate: response.data.rate,
              devRatio: response.data.devRatio,
              workRatio: response.data.workRatio
            })   
          })
          .catch(function (error) {
            console.log(error);
          })
      }

    onChangePerson(e) {
        this.setState({
          person: e.target.value
        })
      }

    onChangeDevRatio(e) {
    this.setState({
        devRatio: e.target.value
    })
    }

    onChangeWorkRatio(e) {
        this.setState({
            workRatio: e.target.value
        })
    }

    onChangeRate(e) {
        this.setState({
            rate: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
    
        const person = {
          person: this.state.person,
          rate: this.state.rate,
          devRatio: this.state.devRatio,
          workRatio: this.state.workRatio
        }
    
        console.log(person);
    
        axios.post('http://localhost:5000/people/update/' + this.props.match.params.id, person)
          .then(res => console.log(res.data));
    
        window.location = '/devs';
      }

    render(){
        console.log(this.state.people)
        return (
            <Container>
                <h3>Edit Person</h3>
                <Form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                    <label>Person: </label>
                    <Input  type="text"
                        required
                        className="form-control"
                        value={this.state.person}
                        onChange={this.onChangePerson}
                        />
                    </div>
                    <div className="form-group"> 
                    <label>Rate: </label>
                    <Input  type="number" step="1"
                        required
                        className="form-control"
                        value={this.state.rate}
                        onChange={this.onChangeRate}
                        />
                    </div>
                    <div className="form-group"> 
                    <label>Developer Ratio: </label>
                    <Input  min={0} max={1} type="number" step="0.1"
                        required
                        className="form-control"
                        value={this.state.devRatio}
                        onChange={this.onChangeDevRatio}
                        />
                    </div>
                    <div className="form-group"> 
                    <label>Work Ratio: </label>
                    <Input  min={0} max={1} type="number" step="0.1"
                        required
                        className="form-control"
                        value={this.state.workRatio}
                        onChange={this.onChangeWorkRatio}
                        />
                    </div>
                    <div className="form-group">
                    <Button type="submit" >Edit Person </Button>
                    </div>
                </Form>
            </Container>
        )}

}