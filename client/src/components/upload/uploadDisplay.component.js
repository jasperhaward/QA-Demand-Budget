import React, { Component } from 'react';
import axiosConfig from '../../auth/axiosConfig';
import { Table, Container } from 'reactstrap';
import "./upload.css";

export default class UploadDisplay extends Component {
  	constructor(props) {
		super(props);

    	this.state = {
      		stories: []
   		};
	}

  	componentDidMount() {
		  // GET CURRENT SPRINT
	}

  	render () {
    	return (
			<Container className="Container">
				<div className="Title">
					Demand Upload
				</div>

				<Table>

				</Table>
			</Container>
    	)
  	}
}