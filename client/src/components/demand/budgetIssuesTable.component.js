import React, { Component } from 'react';
import { Table } from 'reactstrap';
import IssueModal from "./budgetIssueModal.component"
import "../../App.css"
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
			<td><IssueModal issue={issue}/></td>
    	</tr>
	)
}

export default class IssuesTable extends Component {
	convertTime (totalTime) {
		var hours = Math.floor(totalTime / 60);  
		var minutes = totalTime % 60;
		return hours + "h " + minutes + "m"; 
	}

	renderIssues() {
		return (
			this.props.issues.map( issue => (
				<Issue key={issue.id} issue={issue} rate={this.props.rate} convertTime={this.convertTime}/>
		  	))
		)
	}

  	render () {
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
					{this.renderIssues()}
        		</tbody>
      		</Table>
    	)
  	}
}