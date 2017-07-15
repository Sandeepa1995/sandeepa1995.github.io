/**
 * Created by Damitha on 7/14/2017.
 */
const mongoose = require('mongoose');

var User = mongoose.model('User', {
    iD: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    type: {
        type: String
    },
    batch: [{
        department: {},
        year: {}
    }],
    pW: {
        type: String,
        required: true
    },
    intended_ID: {},
    sent: {},
    w8nApproval: {},
    aD_ID: {},
    sent_AD: {},
    w8nApproval_AD: {},
    event_ID: {},
    sent_Event: {},
    w8nApproval_Event: {}
});

module.exports= {User};