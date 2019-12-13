import React, { useState, useEffect } from 'react';
import axiosConfig from '../../auth/axiosConfig';
import { 
	Table,
	Button,
	Modal,
	ModalBody,
	ModalHeader 
} from 'reactstrap';
import "./upload.css";

export default function UploadModal (props) {
	const sprint  = props.sprint;
	const project = props.project;

	const [open, setOpen] = useState(false);
	const [stories, setStories] = useState([
		{
			summary: '',
			description: '',
			components: {
				ios: 0,
				android: 0,
				design: 0
			}
		}
	]);
	
	const postStories = () => {
		//axiosConfig.post()
	}

	const handleChange = (e, idx) => {
		const tempStories = [...stories];
		var { name, value } = e.target;
		if (name.includes('components.')) {
			name = name.replace("components.", "");
			tempStories[idx].components[name] = value
		} else {
			tempStories[idx][name] = value
		}
		setStories(tempStories);
	};
	
	const handleAddRow = () => {
		const story = {
			summary: '',
			description: '',
			components: {
				ios: 0,
				android: 0,
				design: 0
			}
		};
		setStories([...stories, story]);
	};

	const handleRemoveSpecificRow = (idx) => {
		const tempStories = stories
		tempStories.splice(idx, 1)
		setStories(tempStories);
	}	

	const toggle = (e) => {
		e.stopPropagation();

		!sprint.name.includes( "All" || "Un-assigned") && sprint.state !== "closed" 
		? setOpen(!open) 
		: alert('Select current or future sprint to upload to.');
	}

    return (
		<Button className="Button" size="sm" onClick={e => toggle(e)}> 
			+
			<Modal size="xl" isOpen={open} toggle={toggle}>
    			<ModalHeader toggle={toggle}>
					Upload demand stories to {project.name} for {sprint.name}
				</ModalHeader>
        		<ModalBody>
					<Table striped bordered size="sm">
						<tbody>
							{stories.map((item, idx) => (
    			            <tr key={idx}>
                  				<td>
                    				<input type="text"
										   name="summary"
										   placeholder="Summary"
                    	  				   value={stories[idx].summary}
                        				   onChange={e => handleChange(e, idx)}
									/>
                  				</td>
								<td>
                    				<input type="text"
	             	     				   name="description"
										   placeholder="Description"
                        	  				value={stories[idx].description}
                          				   onChange={e => handleChange(e, idx)}
									/>
                      			</td>
								<td>
									{Object.keys(item.components).map((compName, index) => 
										<input key={index}
											   type="text" 
											   placeholder={compName}
											   name={"components." + compName} 
											   value={stories[idx].components.compName}
											   onChange={e => handleChange(e, idx)}/>
									)
									}
								</td>
								<td>
                        			<Button className="Button" size='sm' onClick={() => handleRemoveSpecificRow(idx)}>
										Remove story
									</Button>
                      			</td>
							</tr>
                			))}
            			</tbody>
					</Table>
					
					<div style={{display: 'flex', justifyContent: 'space-between', marginTop: '15px'}}>
						<Button className="Button" onClick={() => handleAddRow()}>
							Add story
						</Button>

						<Button className="Button" onClick={() => postStories()}>
							Upload
						</Button>
					</div>
						
				</ModalBody>
			</Modal>
		</Button>
    )
}