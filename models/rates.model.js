const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rateHistorySchema = new Schema(
	{ 
		sprint: {
			type:String,
			required: true
		},
		projects: {
			type:Array,
			required: true
		}
	},
	{
		versionKey: false
	}
);

const RateHistory = mongoose.model( "RateHistory", rateHistorySchema, "ratehistories") ;

module.exports = RateHistory;