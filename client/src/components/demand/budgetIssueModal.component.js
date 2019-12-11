import React, { Component } from 'react';
import axiosConfig from '../../auth/axiosConfig';
import config from '../../config.js';
import "../../App.css";
import { 
	Table,
	Button,
	Modal,
	ModalBody,
	ModalHeader,
} from 'reactstrap';

const Subtask = (props) => {
	const subtask = props.subtask;

	return (
		<tr key={subtask.id}>
			<td>
				<a href={ config.jiraUrl + subtask.key }>
					{subtask.key}
				</a>
			</td>
			<td>{subtask.fields.summary}</td>
			<td>{subtask.fields.description}</td>
			<td>{props.convertTime(subtask.fields.timespent/60)}</td>
			<td>{subtask.fields.timeoriginalestimate/3600 + "h"}</td>
		</tr>
	)
}

export default class IssueModal extends Component {
	constructor(props) {
		super(props);

    	this.state = {
			modalOpen: false,
			subtasks: []
   		};
	}

	convertTime (totalTime) {
		var hours = Math.floor(totalTime / 60);  
		var minutes = totalTime % 60;
		return hours + "h " + minutes + "m"; 
	}

	renderSubtasks () {
		return this.state.subtasks.map( subtask => (
			<Subtask key={subtask.id} subtask={subtask} convertTime={this.convertTime}/>
		))
	}

	componentDidMount () {
		axiosConfig.post(config.subtasksUrl + this.props.issue.id)
			.then(res => this.setState({ subtasks: res.data }))
			.catch(err => console.warn(err));	
	}

	render() {
		const toggle = () => this.setState({ modalOpen: !this.state.modalOpen });

		return	(
			<Button className="Button" onClick={toggle} size="sm"> 
				View Details
				<Modal isOpen={this.state.modalOpen} toggle={toggle} size="xl">
        			<ModalHeader toggle={toggle}>
						{this.props.issue.fields.summary}
					</ModalHeader>
        			<ModalBody>
						<h5>Description:</h5>
						<div>{this.props.issue.fields.description}</div>
						<h5>Subtasks:</h5>

						<Table striped bordered size="sm" hidden={!this.state.subtasks.length}>
							<thead>
								<tr>
									<th>Key</th>
									<th>Summary</th>
									<th>Description</th>
									<th>Logged Hours</th>
									<th>Estimated Hours</th>
								</tr>
							</thead>

							<tbody>
								{this.renderSubtasks()}
							</tbody>
						</Table>
			        </ModalBody>
      			</Modal>
			</Button>
		)
	}
}