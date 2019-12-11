import React from 'react';
import { Button } from 'reactstrap';
import "./demand.css";

export default class InputComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  inputValue: ''
		};
	}

	render () {
		return	(
			<td>
				<input placeholder="Input new rate" 
					   style={{height: "30px"}}
					   onChange={(e) => this.setState({ inputValue: e.target.value })}>
				</input>
				<Button className="Button" 
						onClick={() => this.props.updateDb(  this.state.inputValue, this.props.project.key, this.props.sprint._id )}
						size="sm">
					Update
				</Button>
			</td>
		)
	}
}