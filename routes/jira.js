const router = require('express').Router();
const request = require('request');
const RateHistory = require("../models/rates.model");
const config = require('../config');

router.route('/upload').post(async (req, res) => {
	req.body.stories.map(async story => {
		var parentFields = {
			fields: {
				project: {
					key: req.body.project.key
				},
				summary: story.summary,
				description: story.description,
				issuetype: {
					name: 'Demand'
				},
				[config.sprintField]: req.body.sprint.id
			}
		}
		
		let parent = await asyncRequest(config.uploadUrl, true, parentFields)
							.catch(err => res.status(400).json(err));

		console.log(parent)
	});

   	res.json('done')
})

router.route('/projects').get(async (req, res) => {
	asyncRequest(config.projectsUrl)
		.then(response => res.json(response))
		.catch(err => res.status(400).json(err));
})

router.route('/sprints').get(async (req, res) => {
	asyncRequest(config.sprintsUrl)
		.then(response => res.json(response))
		.catch(err => res.status(400).json(err));
})

router.route('/issues').get(async (req, res) => {
	asyncRequest(config.issuesUrl)
		.then(response => {
			var issues = response.issues;

			try {
				issues.sort((a,b) => (switchCase(a) > switchCase(b)) ? 1 : (switchCase(a) < switchCase(b)) ? -1 : 0);
				res.json(issues);
			} catch {
				res.json([])
			}
		})
		.catch(err => res.status(400).json(err));
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

router.route("/subtasks/:id").post(async (req, res) => {
	var subtasks = [];
	let parent = await asyncRequest(config.uniqueIssueUrl + req.params.id)
							.catch(err => res.status(400).json(err));
	
	await Promise.all(
		parent.fields.subtasks.map(async subtask => {
			subtask = await asyncRequest(config.uniqueIssueUrl + subtask.id)
								.catch(err => res.status(400).json(err));
			subtasks.push(subtask);
		})
	);
	
	res.json(subtasks);
})

router.route('/rates').get(async (req, res) => {
	let sprints = await asyncRequest(config.sprintsUrl)
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
	let json = await asyncRequest(config.projectsUrl)
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

function asyncRequest (url, post, body) {
	return new Promise (function (resolve, reject) {
		var options = {
			url: url,
			headers: { 'content-type': 'application/json' },
			auth: { 
				username: config.username, 
				password: config.password 
			},
		}
		
		if (post) {
			options.method = 'POST',
			options.body = JSON.stringify(body)
		}
	
 		request(options, function (err, response, resBody) {
			if (err) reject(err);
	 		resolve(JSON.parse(resBody))
		});
	})
}

module.exports = router;