const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const globalsSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    }
});

const Globals = mongoose.model('Globals', globalsSchema, "Globals");


module.exports = Globals;