const mongoose = require('mongoose');

var date = new Date();


const requestSchema = mongoose.Schema(
    {
        requestPatient: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'RequestPatient',
            required: true,
        }],
        hospitalType: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hospital',
            required: false,
        }],
        // user: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'Patient',
        // },
        // response: {
        //     type: Boolean,
        //     required: false,
        // },
        // dateRequested: {
        //     type: Date,
        //     default: Date.now(),
        // },
        timeRequested: {
            type: Date,
            default: Date.now(),
        },
        status: {
            type: String,
            required: true,
            default: 'Pending', //Accepted, Rejected
        },
    },
    {
        timestamps: true,
    }
);

exports.Request = mongoose.model('Request', requestSchema);
