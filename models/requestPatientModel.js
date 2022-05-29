const mongoose = require('mongoose');

const requestPatientSchema = mongoose.Schema(
    {
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Patient'
        }
    }
);

exports.RequestPatient = mongoose.model('RequestPatient', requestPatientSchema);
