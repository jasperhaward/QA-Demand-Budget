import React, { Component } from 'react';
import axiosConfig from '../../auth/axiosConfig';
import config from "../../config.js"
import "./demand.css";
import { 
	Dropdown, 
	DropdownItem, 
	DropdownMenu, 
	DropdownToggle
} from 'reactstrap';

export default class SprintDropDown extends Component {
	constructor(props) {
    	super(props);

    	this.state = {
			sprints: [],
			dropDownOpen: false
   		};
	}

	componentDidMount() {
		axiosConfig.get( config.sprintsUrl )
			.then(res => this.setState({ sprints: res.data.values || []}))
			.catch(error => console.warn(error));
	}

	renderMenu () {
		if ( this.props.additionalOptions ) {
			return (
				<DropdownMenu>
				<DropdownItem onClick={() => this.props.updateSprint('All') }>
							All
				</DropdownItem>
				<DropdownItem onClick={() => this.props.updateSprint('Un-assigned') }>
					Un-assigned
				</DropdownItem>
				<DropdownItem divider/>
					{this.state.sprints.map( sprint => (
						<DropdownItem key={sprint.id} onClick={() => this.props.updateSprint(sprint.name) }>
							{sprint.name}
						</DropdownItem>
					))}
				</DropdownMenu>
			)
		}
		
		return (
			<DropdownMenu>
				{this.state.sprints.map( sprint => (
					<DropdownItem key={sprint.id} onClick={() => this.props.updateSprint(sprint.name) }>
						{sprint.name}
					</DropdownItem>
				))}
			</DropdownMenu>
		)
	}
	
	render () {
		const toggleDropDown = () => this.setState({ dropDownOpen: !this.state.dropDownOpen });

		return (
			<Dropdown isOpen={this.state.dropDownOpen} toggle={toggleDropDown} >
				<DropdownToggle className="DropDown" caret>
					{this.props.sprint}
				</DropdownToggle>
				{this.renderMenu()}
			</Dropdown>
		)
  	}
}