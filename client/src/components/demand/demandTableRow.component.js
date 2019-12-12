import React, { Component } from 'react';
import IssuesTable from "./demandIssuesTable.component";
import UploadModal from "../upload/uploadModal.component";
import "./demand.css";

export default class TableRow extends Component {
  	constructor(props) {
		super(props);

    	this.state = {
			issueTableClosed: true
   		};
	}

	totalLoggedHours () {
		var totalLoggedTime = 0

		this.props.issues.map( issue => totalLoggedTime += issue.fields.timespent/60);

		var hours = Math.floor(totalLoggedTime / 60) + "h";  
 		var minutes = (totalLoggedTime % 60) + "m";
  		return hours + " " + minutes; 
	}
	  
	totalEstimatedHours () {
		var totalLoggedTime = 0

	 	this.props.issues.map( issue => totalLoggedTime += issue.fields.timeoriginalestimate);

		return Math.floor(totalLoggedTime / 3600);
	}
  
	totalCost () {
	 	return this.totalEstimatedHours() * this.props.rate;
	}

  	render () {
		const project = this.props.project;

		const toggleIssuesTable = () => { this.setState({ issueTableClosed: !this.state.issueTableClosed }) };

    	return (
			<tbody>
				<tr onClick={toggleIssuesTable}>
					<td className="ImageTd">
						<img alt='project' src={ project.avatarUrls['48x48'] }/>
					</td>
					<td>{ project.key }</td>
					<td>{ project.name }</td>
					<td>{ this.totalLoggedHours() }</td>
					<td>{ this.totalEstimatedHours() + "h"}</td>
					<td>{ this.props.rate || "Select Sprint"}</td>
					<td>{ this.totalCost() }</td>
					<td><UploadModal project={this.props.project} sprint={this.props.sprint}/></td>
			    </tr>

			  	<tr>
					<td colSpan={8} hidden={this.state.issueTableClosed || !this.props.issues.length}>
						<IssuesTable issues={this.props.issues} rate={this.props.rate}/>
					</td>
				</tr>
			</tbody>
		)
  	}
}