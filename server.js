const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const config = require('./config')

const jiraRouter = require("./routes/jira");
const budgetRouter = require("./routes/budget");
const peopleRouter = require("./routes/people");
const globalsRouter = require("./routes/globals");
const authRouter = require("./routes/auth");

app.use(cors({
	credentials: true,
	origin: config.frontendUrl
}));
app.use(express.json());
app.use(cookieParser());
app.use(authRouter.checkToken)

var url = "mongodb://localhost:27017/test";

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', () => console.log('MongoDB database connection established succesfully.'))
		  .on('error', console.error.bind(console, 'MongoDB connection error:'));

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Server started on ${port}`));

app.use('/auth', authRouter.router)
app.use('/globals', globalsRouter)
app.use('/people', peopleRouter)
app.use('/jira', jiraRouter)
app.use('/devs', budgetRouter)

module.exports = app;