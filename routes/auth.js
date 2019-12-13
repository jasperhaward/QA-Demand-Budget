const router = require('express').Router();
const jwt = require('jsonwebtoken');
const ldap = require('ldapjs');
const config = require('../config');

const client = ldap.createClient({url: config.ldap.url, reconnect: true});

router.route('/validate').post((req, res) => {
	res.status(200).json({ status: "Valid token." });
})

router.route('/login').post((req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	
	if (username && password) {
		validateCredentials(username, password, (valid) => {
			if (valid) 
			{
				let token = jwt.sign({username: username},
					config.secret,
					{ expiresIn: config.tokenDuration }
				);
			
				res.cookie('token', token, { maxAge: config.tokenDuration*1000, httpOnly: false});
				res.status(200).json({ status: "Valid login." });
			} else {
				res.status(403).json({ status: "Invalid credentials." });
			}
		})
	} else {
		res.status(400).json({ status: "Invalid request." });
	}
})

function validateCredentials (username, password, callback) {
	client.on('error', err => console.warn(err));
	
	client.bind(config.ldap.dn.replace(':ein', username), password, function(err) {
     	client.unbind();
     	if (err) {
			console.warn('Invalid user login for', username);
          	callback(false);
     	} else {
          	callback(true);
		}
	});
}

function checkToken (req, res, next) {
	if (req.path === '/auth/login/') {
		next();
	} else {
		let token = req.cookies.token
	
		if (token) {
	  		jwt.verify(token, config.secret, (err, decoded) => {
				if (err) {
		  			return res.status(403).json({ status: "Invalid token"});
				} else {
					res.status(200);
			  		next();
				}
	  		});
		} else {
	  		return res.status(400).json({ status: "Invalid request, missing token."});
		}
	}
};
  
module.exports = {
	checkToken: checkToken,
	router: router
};