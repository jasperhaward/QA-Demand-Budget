import React, { Component } from 'react';
import axiosConfig from '../../auth/axiosConfig';
import { 
	Table,
	Button,
	Modal,
	ModalBody,
	ModalHeader 
} from 'reactstrap';
import "./upload.css";

const story = (props) => (
	{ 
		summary: props.name,
		description: props.description,
		components: props.components
	}
)

function App() {
	//const [validToken, setValidToken] = useState(false);

	return ( 
		<div></div>
	)
}

export default class UploadModal extends Component {
  	constructor(props) {
		super(props);

    	this.state = {
			open: false,
			components: [],
      		stories: []
   		};
	} 

	addStory () {
		
	}

	upload () {
		// POST TO ENDPOINT FOR PUSHING INTO JIRA
	}

	componentDidMount () {
		// TODO COOKIES -> JSON etc
	}

  	render () {
		const sprint  = this.props.sprint;
		const project = this.props.project;

		const toggle = (e) => {
			e.stopPropagation();

			if (!sprint.name.includes( "All" || "Un-assigned") && 
				sprint.state !== "closed") 
			{
				this.setState({ open: !this.state.open });
			} else { 
				alert('Select current or future sprint to upload to.')
			}
		}

    	return (
			<Button className="Button" size="sm" onClick={e => toggle(e)}> 
				+
				<Modal size="lg" isOpen={this.state.open} toggle={toggle}>
        			<ModalHeader toggle={toggle}>
						Upload {project.name} Demand for {sprint.name}
					</ModalHeader>
        			<ModalBody>
						<Button className="Button" size="sm" onClick={this.addStory()}>
							+
						</Button>

						<Table striped bordered size="sm">
							<thead>
								<tr>
									<th>Summary</th>
									<th>Description</th>
									<th>Components</th>
								</tr>
							</thead>
							<tbody>

							</tbody>
						</Table>

						<Button className="Button" size="sm" onClick={this.upload()}>
							Upload
						</Button>
					</ModalBody>
				</Modal>
			</Button>
    	)
  	}
}