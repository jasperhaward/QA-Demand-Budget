import React, { useState, useEffect } from 'react';
import axiosConfig from '../../auth/axiosConfig';
import config from '../../config.js';
import "./demand.css";
import { 
	Button,
	Modal,
	ModalBody,
	ModalHeader,
	Table
} from 'reactstrap';
import SprintDropDown from "./demandSprintDd.component"

function RateRow (props) {
	const [inputVal, setInputVal] = useState(false);
	
	return (
		<tr className="RateTd">
			<td>{props.project.key}</td>
			<td>{props.project.rate}</td>
			<td> 
				<input placeholder="Input new rate" 
				   onChange={(e) => setInputVal(e.target.value)}>
				</input>
				<Button className="Button" 
						onClick={() => props.updateDb(inputVal, props.project.key, props.sprint._id)}
						size="sm">
					Update
				</Button>
			</td>
		</tr>
	)
}

export default function RateModal ({ rates, updateRates  }) {
	const [sprintFilter, setSprintFilter] = useState('');
	const [modalOpen, setModalOpen] = useState(false);

	const toggle = () => setModalOpen(!modalOpen);
	
	const updateDb = (rate, project, _id) => {
		if (rate) {
			axiosConfig.post(config.updateRatesUrl, { rate: rate, project: project, id: _id })
				.then(res => updateRates(res.data))
				.catch(err => console.warn(err));
		}
	}

	const renderRates = () => {
		var items = [];
		
		rates
			.filter( sprint => sprint.sprint === sprintFilter.name )
			.map( sprint => sprint.projects
				.map(( project, index ) => items.push(
					<RateRow key={index} project={project} sprint={sprint} updateDb={updateDb}/>
				))
			)

		return items;
	}
	
	useEffect (() => {
		axiosConfig.get(config.ratesUrl)
			.then(res => updateRates(res.data))
			.catch(err => console.warn(err));	
	}, [updateRates]);

	return	(
		<Button className="Button" onClick={toggle}> 
			Edit Rate History
			<Modal size="lg" isOpen={modalOpen} toggle={toggle}>
        		<ModalHeader toggle={toggle}>
					Rate History
				</ModalHeader>
    			<ModalBody>
					<SprintDropDown sprint={sprintFilter} 
									updateSprint={setSprintFilter} 
									additionalOptions={false}
					/>

					<Table size="sm" striped bordered className="RatesTable">
						<thead>
							<tr>
								<th>Project</th>
								<th>Current Rate (£)</th>
								<th>Update Rate</th>
							</tr>
						</thead>
							
						<tbody>
							{renderRates()}
						</tbody>
					</Table>
		        </ModalBody>
  			</Modal>
		</Button>
	)
}