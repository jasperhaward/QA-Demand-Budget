const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const devSchema = new Schema({
    person : {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    devRatio: {
        type: Number,
        required: true
    },
    workRatio: {
        type: Number,
        required: true
    }
});

const Devs = mongoose.model('Devs', devSchema, "Devs");


module.exports = Devs;