import React, { useState, useEffect } from 'react';
import axiosConfig from '../../auth/axiosConfig';
import { Table, Container } from 'reactstrap';
import "./demand.css";
import config from '../../config.js';
import TableRow from "./demandTableRow.component"
import FunctionBar from "./demandFunctionBar.component"

export default function DemandDisplay () {
	const [issues, setIssues] = useState([]);
	const [projects, setProjects] = useState([]);
	const [rates, setRates] = useState([]);
	const [sprint, setSprint] = useState({ name: "All" });
	const [status, setStatus] = useState({
		new: true,
		dev: true,
		owner: true,
		acc: true,
		post: true
	});
	
	const updateStatus = (type) => {
		var tempStatus = status;
		tempStatus[type] = !status[type];

		setStatus(tempStatus);
	}

	const filterIssues = (projectKey) => {
		return issues
				.filter(issue => issue.fields.project.key === projectKey )
				.filter(issue => ( !issue.fields.sprint && sprint.name === "Un-assigned" ) ||
								 ( issue.fields.sprint && issue.fields.sprint.name === sprint.name ) || 
								   sprint.name === "All" )
				.filter(issue => ( issue.fields.status.name.includes("New") && status.new ) ||
								 ( issue.fields.status.name.includes("Developer") && status.dev ) ||
								 ( issue.fields.status.name.includes("Owner") && status.owner ) ||
								 ( issue.fields.status.name.includes("Accepted") && status.acc ) || 
							 	 ( issue.fields.status.name.includes("Postponed") && status.post ) )
	}

	const filterRates = (projectKey) => {
		var rate = 0;
		
		rates
			.filter(ratesSprint => ratesSprint.sprint === sprint.name )
			.map(selectedSprint =>  selectedSprint.projects
				.filter(project => project.key === projectKey )
				.map(project => rate = project.rate ))

		return rate;
	}

	const renderProjects = () => {
		return (
			projects.map(project => (
				<TableRow key={project.id} 
						  project={project} 
						  sprint={sprint}
						  rate={filterRates(project.key)}
						  issues={filterIssues(project.key)}
				/>
			))
		)
	}

  	useEffect (() => {
		axiosConfig.get(config.projectsUrl)
			.then(res => setProjects(res.data))
			.catch(err => console.warn(err));

		axiosConfig.get(config.issuesUrl)
			.then(res => setIssues(res.data))
			.catch(err => console.warn(err));	
	}, [setIssues, setProjects])

    return (
		<Container className="Container">
			<div className="Title">
				Demand Stories by Project
			</div>

			<FunctionBar sprint={sprint}
					     updateSprint={setSprint}
					     updateStatus={updateStatus}
					     rates={rates}
					     updateRates={setRates}
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
					
					{renderProjects()}
				</Table>
			</div>
		</Container>
    )
}