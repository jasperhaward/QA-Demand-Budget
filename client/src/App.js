import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import DemandDisplay from "./components/demand/demandDisplay.component";
import DevDisplay from "./components/devs.component";
import AddDevDisplay from "./components/addDev.component";
import DevEditDisplay from "./components/devsEdit.component";
import AppNavbar from "./components/navbar.component";
import GlobalsDisplay from "./components/globals.component";
import GlobalsEditDisplay from "./components/globalsEdit.component";

import axios from 'axios';
import config from './config.js';
import Login from "./auth/loginComponent"
import PrivateRoute from "./auth/privateRoute"
import Cookies from 'universal-cookie';

const cookies = new Cookies()

axios.defaults.withCredentials = true

function App() {
	const [validToken, setValidToken] = useState(false);
	
	function login () {
		setValidToken(true);
	}

	function logout () {
		setValidToken(false);
		cookies.remove('token');
	}

	useEffect(() => {
		const existingToken = cookies.get('token');
 
		if (existingToken) {
			axios.post(config.validateUrl)
				.then(res => setValidToken(true))
				.catch(err => console.warn(err));
		}
	}, [setValidToken])

  	return (
    	<Router>
    		<div className="App">
    			<AppNavbar validToken={validToken} logout={() => logout}/>
				<Route path="/login" render={() => <Login validToken={validToken} login={login}/>}/>	
				<PrivateRoute validToken={validToken} path="/demand" component= {DemandDisplay}/>
				<PrivateRoute validToken={validToken} path="/devs" exact component= {DevDisplay} />
				<PrivateRoute validToken={validToken} path="/devs/add/" component= {AddDevDisplay} />
			    <PrivateRoute validToken={validToken} path="/devs/edit/:id" component= {DevEditDisplay} />
				<PrivateRoute validToken={validToken} exact path="/globals/" component= {GlobalsDisplay} />
 	        	<PrivateRoute validToken={validToken} exact path="/globals/edit/:id" component= {GlobalsEditDisplay} />
			</div>
   		</Router>
   );
}

export default App;
