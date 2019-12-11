const router = require('express').Router();
const request = require('request');
const RateHistory = require("../models/rates.model")

const baseUrl = 'http://localhost:8080/rest/';
const issuesUrl = baseUrl + 'agile/1.0/board/2/issue/';
const uniqueIssueUrl = baseUrl + "agile/1.0/issue/";
const sprintsUrl = baseUrl + 'agile/1.0/board/9/sprint/';
const projectsUrl = baseUrl + 'api/2/project/';

router.route("/subtasks/:id").post(async (req, res) => {
	var subtasks = [];
	let parent = await asyncRequest(uniqueIssueUrl + req.params.id)
							.catch(err => res.status(400).json(err));
	
	await Promise.all(
		parent.fields.subtasks.map(async subtask => {
			subtask = await asyncRequest(uniqueIssueUrl + subtask.id)
								.catch(err => res.status(400).json(err));
			subtasks.push(subtask);
		})
	);
	
	res.json(subtasks);
})

router.route('/issues').get(async (req, res) => {
	let json = await asyncRequest(issuesUrl)
						.catch(err => res.status(400).json(err));
	var issues = json.issues;

	try {
		issues.sort((a,b) => (switchCase(a) > switchCase(b)) ? 1 : (switchCase(a) < switchCase(b)) ? -1 : 0);
		res.json(issues);
	} catch {
		res.json([])
	}
})

function switchCase (issue) {
	var status = issue.fields.status.name;
	
	switch ( true ) {
		case status.includes("New"):
			return 0;
		case status.includes("Developer"):
			return 1;
		case status.includes("Owner"):
			return 2;
		case status.includes("Postponed"):
			return 3;
		case status.includes("Accepted"):
			return 4;
		default: 
			return -1;
	} 
}
 
router.route('/projects').get(async (req, res) => {
	let json = await asyncRequest(projectsUrl)
					 	.catch(err => res.status(400).json(err));
	res.json(json);
})

router.route('/sprints').get(async (req, res) => {
	let json = await asyncRequest(sprintsUrl)
						.catch(err => res.status(400).json(err));
	res.json(json);
})

router.route('/rates').get(async (req, res) => {
	let sprints = await asyncRequest(sprintsUrl)
					        .catch(err => res.status(400).json(err));

	if (sprints.length) {
		await Promise.all(
			sprints.values.map( async sprint => {
				let doc = await RateHistory.find({ sprint: sprint.name }) 
										   .catch(err => res.status(400).json(err))

				if ( !doc.length ) {
					await newSprint(sprint.name, res);
				}
			})
		)
	}

	RateHistory.find()
		.then(result => res.json(result) )
		.catch(err => res.status(400).json(err))
})

async function newSprint (sprint, res) {
	let json = await asyncRequest(projectsUrl)
						.catch(err => res.status(400).json(err));

	var document = new RateHistory ({
		sprint: sprint,
		projects: []
	});

	json.map(project => {
		document.projects.push({
			key: project.key,
			rate: 0
		})
	});
		
	await RateHistory.create(document)
					 .catch( err => res.status(400).json(err))
}

router.route('/updaterates').post( async (req, res) => {
	await RateHistory.updateOne(
		{ 	
			"_id" : req.body.id,
			"projects.key": req.body.project 
		}, 
		{ 
			"$set": { "projects.$.rate": req.body.rate } 
		})
		.catch(err => res.status(400).json(err))
		
	RateHistory.find()
		.then(result => res.json(result))
		.catch(err => res.status(400).json(err))
})

function asyncRequest (url) {
	return new Promise (function (resolve, reject) {
		var options = {
	 		url: url,
		  	auth: { 
			 	username: 'jasper.haward', 
			 	password: 'Cicero1245' 
		 	}
 		}
	
 		request(options, function (err, response, body) {
			if (err) reject(err);
	 		resolve(JSON.parse(body))
		});
	})
}

module.exports = router;