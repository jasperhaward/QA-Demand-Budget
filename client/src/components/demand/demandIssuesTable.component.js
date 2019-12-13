import React from 'react';
import { Table } from 'reactstrap';
import IssueModal from "./demandIssueModal.component"
import "./demand.css";
import config from '../../config.js';

const Issue = (props) => {
	const issue = props.issue;

	return (
		<tr>
			<td>
				<a href={ config.jiraUrl + issue.key }>
					{issue.key}
				</a>
			</td>
        	<td>{ issue.fields.summary }</td>
	        <td>{ issue.fields.status.name }</td>
			<td>{ issue.fields.sprint ? issue.fields.sprint.name : "Un-assigned" }</td>
			<td>{ props.convertTime(issue.fields.timespent/60) }</td>
	        <td>{ issue.fields.timeoriginalestimate/3600 + "h"}</td>
			<td>{ props.rate * issue.fields.timeoriginalestimate/3600 }</td>
			<td><IssueModal issue={issue} convertTime={props.convertTime}/></td>
    	</tr>
	)
}



export default function IssuesTable (props) {
	const convertTime = (totalTime) => {
		var hours = Math.floor(totalTime / 60);  
		var minutes = totalTime % 60;
		return hours + "h " + minutes + "m"; 
	}

	const renderIssues = () => {
		return (
			props.issues.map( issue => (
				<Issue key={issue.id} issue={issue} rate={props.rate} convertTime={convertTime}/>
		  	))
		)
	}

    return (
		<Table striped bordered size="sm">
			<thead>
			  	<tr>
					<th className="Column">Key</th>
					<th>Summary</th>
					<th className="Status">Status</th>
				   	<th className="Column">Sprint</th>
					<th className="Column">Logged Time</th>
					<th className="Column">Est. Hours</th>
					<th className="Column">Cost (£)</th>
					<th className="Column">Details</th>
			  	</tr>
			</thead>

			<tbody>
				{renderIssues()}
    		</tbody>
  		</Table>
    )
}