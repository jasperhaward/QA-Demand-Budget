import React, { Component } from 'react';
import axiosConfig from '../../auth/axiosConfig';
import { Table, Container } from 'reactstrap';
import "./demand.css";
import config from '../../config.js';
import TableRow from "./demandTableRow.component"
import FunctionBar from "./demandFunctionBar.component"

export default class DemandDisplay extends Component {
  	constructor(props) {
		super(props);
		
		this.updateSprint = this.updateSprint.bind(this)
		this.updateStatus = this.updateStatus.bind(this)
		this.updateRates = this.updateRates.bind(this)

    	this.state = {
      		issues: [],
			projects: [],
			rates: [],
			sprint: { name: 'All' },
			status: {
				new: true,
				dev: true,
				owner: true,
				acc: true,
				post: true
			}
   		};
	}

	updateSprint (sprint) {	this.setState({ sprint: sprint }) }

	updateRates (rates) { this.setState({ rates: rates }) }

	updateStatus (type) {
		var status = this.state.status

		status[type] = !this.state.status[type]

		this.setState({ status: status })
	}

	filterIssues (projectKey) {
		var issues = [];
		issues = this.state.issues
				.filter( issue => issue.fields.project.key === projectKey )
				.filter( issue => ( !issue.fields.sprint && this.state.sprint.name === "Un-assigned" ) ||
								  ( issue.fields.sprint && issue.fields.sprint.name === this.state.sprint.name ) || 
								  this.state.sprint.name === "All" )
				.filter( issue => ( issue.fields.status.name.includes("New") && this.state.status.new ) ||
								  ( issue.fields.status.name.includes("Developer") && this.state.status.dev ) ||
								  ( issue.fields.status.name.includes("Owner") && this.state.status.owner ) ||
								  ( issue.fields.status.name.includes("Accepted") && this.state.status.acc ) || 
								  ( issue.fields.status.name.includes("Postponed") && this.state.status.post ) )
		
		return issues;
	}

	filterRates (projectKey) {
		var rate = 0;

		this.state.rates
			.filter( sprint => sprint.sprint === this.state.sprint.name )
			.map( selectedSprint =>  selectedSprint.projects
				.filter( project => project.key === projectKey )
				.map( project => rate = project.rate ))

		return rate;
	}

	renderProjects () {
		return (
			this.state.projects.map( project => (
				<TableRow key={project.id} 
						  project={project} 
						  sprint={this.state.sprint}
						  rate={this.filterRates(project.key)}
						  issues={this.filterIssues(project.key)}
				/>
			))
		)
	}

  	componentDidMount() {
		axiosConfig.get(config.projectsUrl)
			.then(res => this.setState({ projects: res.data }))
			.catch(err => console.warn(err));

		axiosConfig.get(config.issuesUrl)
			.then(res => this.setState({ issues: res.data }))
			.catch(err => console.warn(err));	
	}

  	render () {
    	return (
			<Container className="Container">
				<div className="Title">
					Demand Stories by Project
				</div>

				<FunctionBar sprint={this.state.sprint}
						     updateSprint={this.updateSprint}
						     updateStatus={this.updateStatus}
						     rates={this.state.rates}
						     updateRates={this.updateRates}
				/>

				<div className="TableDiv">
					<Table size="sm">
	      				<thead>
    						<tr>
		      					<th>Project</th>
	        	  				<th>Key</th>
		    	  				<th>Name</th>
								<th>Logged Time</th>
          						<th>Estimated Hours</th>
          						<th>Rate (£)</th>
          						<th>Total Demand Cost (£)</th>
								<th>Upload demand</th>
		    				</tr>
    	  				</thead>
					
						{this.renderProjects()}
					</Table>
				</div>
			</Container>
    	)
  	}
}