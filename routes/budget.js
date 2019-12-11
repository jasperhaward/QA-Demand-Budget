const router = require('express').Router();
const Devs = require ("../models/devs.model")
const Globals = require("../models/globals.model")

router.route('/rates').get(async (req,res) => {
    let devs, globals, blendedRate, daysPerMonth, daysPerYear, personDayEffort;

    devs = await Devs.find()
        .catch(err => res.status(400).json('Error: ' + err));

    globals = await Globals.find()
        .catch(err => res.status(400).json('Error: ' + err));
    
    for (ii = 0; ii < globals.length ; ii++) {
        var name = globals[ii].name
        switch(name){
            case 'blendedRate' : 
                blendedRate = globals[ii].value; 
                break;
            case 'daysPerMonth' : 
                daysPerMonth = globals[ii].value
                break;
            case 'daysPerYear' : 
                daysPerYear = globals[ii].value
                break;
            case 'personDayEffort' : 
                personDayEffort = globals[ii].value
                break;
            default: 
                break;
        }   
    }

    let totalBDR = 0; // The total blended cost per day of each person.
    let totalDC = 0; // The total developer count

    for (i = 0; i < devs.length ; i++) {
        var blCostDay = ((blendedRate * devs[i].workRatio) / 1000) ; // daily blended cost for each person
        var developerRatio = devs[i].devRatio
        totalBDR += blCostDay
        totalDC += developerRatio;
    }
    
    totalBDR = Math.round((totalBDR) * 100) /100

    let costDPH = 0; //cost developer per hour

    costDPH = totalBDR / totalDC;

    let costDPD = 0; // cost developer per day

    costDPD = Math.round((costDPH * 4) * 100) /100;

    ratePDDH = 0; // rate per dev day HIGH
    ratePDH = 0; //rate per dev hour
    ratePDDL = 0; // rate per dev day LOW

    ratePDDH = Math.round(costDPD * 100);
    ratePDH = Math.round(blendedRate / personDayEffort);
    ratePDDL = Math.round(blendedRate / 4);

    res.send([ratePDDH, ratePDDL, ratePDH]);
})

module.exports = router;