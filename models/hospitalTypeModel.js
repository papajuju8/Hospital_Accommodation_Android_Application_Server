const mongoose = require('mongoose');

const hospitalTypeSchema = mongoose.Schema(
    {
        isHospital: { type: Boolean, required: false, default: true },
        isGeneral: { type: Boolean, required: false, default: false },
        isPrivate: { type: Boolean, required: false, default: false },
        isChildrens: { type: Boolean, required: false, default: false },
        isClinic: { type: Boolean, required: false, default: false }
    } 
);

exports.Hospital = mongoose.model('HospitalType', hospitalTypeSchema);