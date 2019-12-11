import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import { Container, Form, Input, Button } from 'reactstrap';
import config from '../config.js';
import "../App.css"
import axios from "axios";

function Login(props) {
  	const [isError, setIsError] = useState(false);
  	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

  	function postLogin() {
		axios.post(config.loginUrl, { username: username, password: password })
			.then(res => props.login())
			.catch(err => { 
				setIsError(true)
				console.warn(err)
			});
	}

  	if (props.validToken) {
    	return <Redirect to="/budget" />;
	}

  	return (
  		<Container>
      		<Form>
				<Input type="username" 
					   placeholder="UIN" 
					   value={username} 
					   onChange={e => setUsername(e.target.value)}
				/>
				<Input type="password" 
					   placeholder="Password" 
					   value={password} 
					   onChange={e => setPassword(e.target.value)}
				/>
        		<Button className="Button" onClick={postLogin}>Login</Button>
				{ isError && <h3>Invalid Username or Password.</h3> }
      		</Form>
   		 </Container>
    );
}

export default Login;