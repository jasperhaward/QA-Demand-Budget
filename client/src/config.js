const baseUrl = "http://localhost:5001"

export default {
	baseUrl: baseUrl,
	issuesUrl: baseUrl + "/jira/issues",
	projectsUrl: baseUrl + "/jira/projects",
	sprintsUrl: baseUrl + "/jira/sprints",
	ratesUrl: baseUrl + "/jira/rates",
	subtasksUrl: baseUrl + "/jira/subtasks/",
	updateRatesUrl: baseUrl + "/jira/updaterates",
	jiraUrl: baseUrl + "/browse/",

	// FOR AUTH AND SESSION 
	
	loginUrl: baseUrl + "/auth/login/",
	validateUrl: baseUrl + "/auth/validate"
}