import React, { useState, useEffect } from 'react';
import axiosConfig from '../../auth/axiosConfig';
import config from "../../config.js"
import "./demand.css";
import { 
	Dropdown, 
	DropdownItem, 
	DropdownMenu, 
	DropdownToggle
} from 'reactstrap';

export default function SprintDropDown ({ additionalOptions, sprint, updateSprint }) {
	const [open, setOpen] = useState(false);
	const [sprints, setSprints] = useState([]);

	const toggle = () => setOpen(!open);

	const mapSprints = () => {
		return sprints.map(sprint => (
			<DropdownItem key={sprint.id} onClick={() => updateSprint(sprint) }>
				{sprint.name}
			</DropdownItem>
		))
	}

	useEffect (() => {
		axiosConfig.get(config.sprintsUrl )
			.then(res => {
				const sprints = res.data.values || [];

				for (var sprint of sprints) {
					if (sprint.state === 'active') {
						updateSprint(sprint)
					}
				}
				setSprints(sprints);
			})
			.catch(error => console.warn(error));
	}, [updateSprint, setSprints])
	
	return (
		<Dropdown isOpen={open} toggle={toggle} >
			<DropdownToggle className="DropDown" caret>
				{sprint.name}
			</DropdownToggle>
			{additionalOptions 
			?
				<DropdownMenu>
					<DropdownItem onClick={() => updateSprint({ name: 'All' })}>
						All
					</DropdownItem>
					<DropdownItem onClick={() => updateSprint({ name: 'Un-assigned' })}>
						Un-assigned
					</DropdownItem>
					<DropdownItem divider/>
					{mapSprints()}
				</DropdownMenu>
			:
				<DropdownMenu>
					{mapSprints()}
				</DropdownMenu>}
		</Dropdown>
	)
}