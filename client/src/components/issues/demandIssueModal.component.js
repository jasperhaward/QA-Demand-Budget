import React, { useEffect, useState } from 'react';
import axiosConfig from '../../auth/axiosConfig';
import config from '../../config.js';
import "../demand/demand.css";
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

export default function IssueModal (props) {
	const [modalOpen, setModalOpen] = useState(false);
	const [subtasks, setSubtasks] = useState([]);

	const toggle = () => setModalOpen(!modalOpen);

	const renderSubtasks = ()=> {
		return subtasks.map( subtask => (
			<Subtask key={subtask.id} subtask={subtask} convertTime={props.convertTime}/>
		))
	}

	useEffect (() => {
		axiosConfig.post(config.subtasksUrl + props.issue.id)
			.then(res => setSubtasks(res.data))
			.catch(err => console.warn(err));	
	}, [props.issue.id, setSubtasks])

	return	(
		<Button className="Button" onClick={toggle} size="sm"> 
			View Details
			<Modal isOpen={modalOpen} toggle={toggle} size="xl">
        		<ModalHeader toggle={toggle}>
					{props.issue.fields.summary}
				</ModalHeader>
        		<ModalBody>
					<h5>Description:</h5>
					<div>{props.issue.fields.description}</div>
					<h5>Subtasks:</h5>

					<Table striped bordered size="sm" className="SubtasksTable" hidden={!subtasks.length}>
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
							{renderSubtasks()}
						</tbody>
					</Table>
			    </ModalBody>
      		</Modal>
		</Button>
	)
}