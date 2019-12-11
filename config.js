module.exports = {
	secret: "testingjwt",
	frontendUrl: "http://localhost:3000",
	tokenDuration: 3600, // DURATION OF TOKEN SECONDS
	ldap: {
		url: "ldaps://collaborate.bt.com:636",
		dn: "cn=:ein,ou=people,ou=btplc,o=bt"
	}
};