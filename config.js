const baseUrl = 'http://localhost:8080/rest/';

module.exports = {
	// CORS ORIGIN
	frontendUrl: "http://localhost:3000",
	
	// JIRA URLS 
	issuesUrl: baseUrl + 'agile/1.0/board/2/issue/',
	uniqueIssueUrl: baseUrl + "agile/1.0/issue/",
	sprintsUrl: baseUrl + 'agile/1.0/board/9/sprint/',
	projectsUrl: baseUrl + 'api/2/project/',

	// JWT VARS 
	secret: "testingjwt",
	tokenDuration: 3600, // DURATION OF TOKEN SECONDS

	// LDAP CREDS 
	ldap: {
		url: "ldaps://collaborate.bt.com:636",
		dn: "cn=:ein,ou=people,ou=btplc,o=bt"
	}
};