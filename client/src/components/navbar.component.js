import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container } from 'reactstrap';

export default class AppNavbar extends Component {
	constructor(props) {
		super(props);
		
		this.state= {
        	isOpen: false,
		}
	}

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

	render() {
    	return(
   			<div>
		        <Navbar style={{backgroundColor: "#5514b4"}} dark expand="md">
        		    <Container>
                		<NavbarBrand href='/demand'>QA Demand</NavbarBrand>
		                <NavbarToggler onClick={this.toggle}/>
        		        <Collapse isOpen={this.state.isOpen} navbar>
                		    <Nav className="mr-auto" navbar>
								<NavItem hidden={!this.props.validToken}><NavLink tag={Link} to="/demand">Demand</NavLink></NavItem>
		                        <NavItem hidden={!this.props.validToken}><NavLink tag={Link} to="/devs">People</NavLink></NavItem>
        		                <NavItem hidden={!this.props.validToken}><NavLink tag={Link} to="/globals">Globals</NavLink></NavItem>

								{this.props.validToken 
								? <NavItem onClick={this.props.logout()}><NavLink tag={Link} to="/login">Logout</NavLink></NavItem>
								: <NavItem><NavLink tag={Link} to="/login">Login</NavLink></NavItem> }
                    		</Nav>
                		</Collapse>
            		</Container>
        		</Navbar>
   			</div>
		);
	}
}