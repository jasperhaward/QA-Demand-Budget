import React, { Component } from 'react';
import axiosConfig from '../../auth/axiosConfig';
import config from '../../config.js';
import "../../App.css";
import { 
	Button,
	Modal,
	ModalBody,
	ModalHeader,
	Table
} from 'reactstrap';
import InputComponent from "./budgetInput.component";
import SprintDropDown from "./budgetSprintDd.component"

const RateTd = (props) => {
	return (
		<tr>
			<td>{props.project.key}</td>
			<td>{props.project.rate}</td>
			<InputComponent updateDb={props.updateDb} project={props.project} sprint={props.sprint}/>
		</tr>
	)
}

export default class RateModal extends Component {
	constructor(props) {
		super(props);

		this.updateDb = this.updateDb.bind(this);
		this.updateSprint = this.updateSprint.bind(this);

    	this.state = {
			sprintFilter: "Select Sprint",
			currentRates: [],
			modalOpen: false,
			dropDownOpen: false
   		};
	}

	updateSprint (sprint) {
		this.setState({ sprintFilter: sprint });
	} 

	updateDb (rate, project, _id) {
		if (rate) {
			axiosConfig.post(config.updateRatesUrl, { rate: rate, project: project, id: _id })
				.then(res => this.props.updateRates(res.data))
				.catch(err => console.warn(err));
		}
	}

	renderRates () {
		var items = [];
		
		this.props.rates
			.filter( sprint => sprint.sprint === this.state.sprintFilter )
			.map( sprint => sprint.projects.map(( project, index ) => items.push(
				<RateTd key={index} project={project} sprint={sprint} updateDb={this.updateDb}/>
			)))

		return items
	}
	
	componentDidMount () {
		// RATES FROM GEORGES ENDPONT

		axiosConfig.get(config.ratesUrl)
			.then(res => this.props.updateRates(res.data))
			.catch(err => console.warn(err));	
	}
	
	render() {
		const toggle = () => this.setState({ modalOpen: !this.state.modalOpen });

		return	(
			<Button className="Button" onClick={toggle}> 
				Edit Rate History
				<Modal size="lg" isOpen={this.state.modalOpen} toggle={toggle} >
        			<ModalHeader toggle={toggle}>
						Rate History
					</ModalHeader>
        			<ModalBody>
						<div className="RateBar">
							<div>
								<SprintDropDown sprint={this.state.sprintFilter} 
												updateSprint={this.updateSprint} 
												additionalOptions={false}
								/>
							</div>
							<div>Current rates -></div>
							<div>High: {this.state.currentRates[0] || 0}</div>
							<div>Medium: {this.state.currentRates[1] || 0}</div>
							<div>Low: {this.state.currentRates[2] || 0}</div>
						</div>

						<Table size="sm" striped bordered hidden={this.state.sprintFilter === "Select Sprint"}>
							<thead>
								<tr>
									<th>Projects</th>
									<th>Previous Rate</th>
									<th>Update Rate</th>
								</tr>
							</thead>
							
							<tbody>
								{this.renderRates()}
							</tbody>
						</Table>
			        </ModalBody>
      			</Modal>
			</Button>
		)
	}
}