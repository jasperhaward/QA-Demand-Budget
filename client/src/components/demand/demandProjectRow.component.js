import React, { useState } from 'react';
import IssuesTable from "./demandIssuesTable.component";
import UploadModal from "../upload/uploadModal.component";
import "./demand.css";

export default function ProjectRow (props) {
	const project = props.project;
	const issues = props.issues;
	const [issueTableClosed, setIssueTableClosed] = useState(true);

	const toggleIssuesTable = () => setIssueTableClosed(!issueTableClosed);

	const totalLoggedHours = () => {
		var totalLoggedTime = 0

		issues.map(issue => totalLoggedTime += issue.fields.timespent/60);

		var hours = Math.floor(totalLoggedTime / 60) + "h";  
 		var minutes = (totalLoggedTime % 60) + "m";
  		return hours + " " + minutes; 
	}
	  
	const totalEstimatedHours = () => {
		var totalLoggedTime = 0

	 	issues.map(issue => totalLoggedTime += issue.fields.timeoriginalestimate);

		return Math.floor(totalLoggedTime / 3600);
	}
  
	const totalCost = () => {
	 	return totalEstimatedHours() * props.rate;
	}

	return (
		<tbody>
			<tr onClick={toggleIssuesTable}>
				<td className="ImageTd">
					<img alt='project' src={ project.avatarUrls['48x48'] }/>
				</td>
				<td>{ project.key }</td>
				<td>{ project.name }</td>
				<td>{ totalLoggedHours() }</td>
				<td>{ totalEstimatedHours() + "h"}</td>
				<td>{ props.rate || "Select Sprint"}</td>
				<td>{ totalCost() }</td>
				<td><UploadModal project={project} sprint={props.sprint}/></td>
		    </tr>

			<tr>
				<td colSpan={8} hidden={issueTableClosed || !issues.length}>
					<IssuesTable issues={issues} rate={props.rate}/>
				</td>
			</tr>
		</tbody>
	)
}