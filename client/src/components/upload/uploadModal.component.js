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

export default class UploadModal extends Component {
  	constructor(props) {
		super(props);

    	this.state = {
			open: false,
			components: [],
      		stories: [{}]
   		};
	} 

	postStories () {
		//axiosConfig.post()
	}

	handleChange = (e, idx) => {
		const { name, value } = e.target;
		const stories = [...this.state.stories];
		stories[idx] = {
		  	[name]: value
		};
		this.setState({
			stories
		});
	};
	
	handleAddRow = () => {
		const story = { 
			summary: '',
			description: '',
			components: ''
		};
		this.setState({
		    stories: [...this.state.stories, story]
		});
	};

	handleRemoveSpecificRow = (idx) => {
		const stories = [...this.state.stories]
		stories.splice(idx, 1)
		this.setState({ stories })
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
				<Modal size="xl" isOpen={this.state.open} toggle={toggle}>
        			<ModalHeader toggle={toggle}>
						Upload demand stories to {project.name} for {sprint.name}
					</ModalHeader>
        			<ModalBody>
						<Table striped bordered size="sm">
							<tbody>
								{this.state.stories.map((item, idx) => (
    			                <tr key={idx}>
                      				<td>
                        				<input type="text"
											   name="summary"
											   placeholder="Summary"
                        	  				   value={this.state.stories[idx].summary || ''}
                          					   onChange={e => this.handleChange(e, idx)}
										/>
                      				</td>
									<td>
                        				<input type="text"
                     	     				   name="description"
											   placeholder="Description"
                        	  				   value={this.state.stories[idx].description || ''}
                          					   onChange={e => this.handleChange(e, idx)}
										/>
                      				</td>
									<td>
										<input type="text"
                     	     				   name="components"
                        	  				   value={this.state.stories[idx].components || ''}
                          					   onChange={e => this.handleChange(e, idx)}
										/>
									</td>
									<td>
                        				<Button className="Button" size='sm' onClick={() => this.handleRemoveSpecificRow(idx)}>
											Remove story
										</Button>
                      				</td>
								</tr>
                 				))}
                			</tbody>
						</Table>
						
						<div style={{display: 'flex', justifyContent: 'space-between', marginTop: '15px'}}>
							<Button className="Button" onClick={() => this.handleAddRow()}>
								Add story
							</Button>

							<Button className="Button" onClick={() => this.postStories()}>
								Upload
							</Button>
						</div>
						
					</ModalBody>
				</Modal>
			</Button>
    	)
  	}
}