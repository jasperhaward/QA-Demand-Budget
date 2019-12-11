import React, { Component } from 'react';
import SprintDropDown from "./budgetSprintDd.component"
import RateModal from "./budgetRateModal.component"
import { Input } from 'reactstrap';
import "../../App.css"

export default class FunctionBar extends Component {
  	render () {
    	return (
			<div  className="FunctionBar">
				<div>
					<SprintDropDown sprint={this.props.sprint} 
									updateSprint={this.props.updateSprint} 
									additionalOptions={true}
					/>
				</div>
				
				<label>
					<Input type="checkbox" defaultChecked onChange={() => this.props.updateStatus("new")}/>
					New Demand
				</label>
				<label>
					<Input type="checkbox" defaultChecked onChange={() => this.props.updateStatus("dev")}/>
					Developer Review
				</label>
				<label>
					<Input type="checkbox" defaultChecked onChange={() => this.props.updateStatus("owner")}/>
					Owner Review
				</label>
				<label>
					<Input type="checkbox" defaultChecked onChange={() => this.props.updateStatus("acc")}/>
					Accepted
				</label>
				<label>
					<Input type="checkbox" defaultChecked onChange={() => this.props.updateStatus("post")}/>
					Postponed
				</label>
				
				<RateModal rates={this.props.rates} updateRates={this.props.updateRates}/>
			</div>
		)
	}
}