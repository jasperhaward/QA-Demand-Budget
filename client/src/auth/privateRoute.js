import React from 'react';
import { Route, Redirect} from "react-router-dom";

const PrivateRoute = ({ component, validToken, ...props }) => (
	validToken 
	? <Route {...props} component={component}/>
	: <Route {...props} render={() => <Redirect to="/login"/>}/>
);

export default PrivateRoute;