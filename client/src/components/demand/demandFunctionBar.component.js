import React from 'react';
import SprintDropDown from "./demandSprintDd.component"
import RateModal from "./demandRateModal.component"
import { Input } from 'reactstrap';
import "./demand.css";

export default function FunctionBar (props) {
    return (
		<div  className="FunctionBar">
			<div>
				<SprintDropDown sprint={props.sprint} updateSprint={props.updateSprint} additionalOptions={true}/>
			</div>
				
			<label>
				<Input type="checkbox" defaultChecked onChange={() => props.updateStatus("new")}/>
				New Demand
			</label>
			<label>
				<Input type="checkbox" defaultChecked onChange={() => props.updateStatus("dev")}/>
				Developer Review
			</label>
			<label>
				<Input type="checkbox" defaultChecked onChange={() => props.updateStatus("owner")}/>
				Owner Review
			</label>
			<label>
				<Input type="checkbox" defaultChecked onChange={() => props.updateStatus("acc")}/>
				Accepted
			</label>
			<label>
				<Input type="checkbox" defaultChecked onChange={() => props.updateStatus("post")}/>
				Postponed
			</label>
				
			<RateModal rates={props.rates} updateRates={props.updateRates}/>
		</div>
	)
}