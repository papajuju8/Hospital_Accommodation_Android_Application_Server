const mongoose = require('mongoose');

const hospitalSchema = mongoose.Schema(
    {
        hospiName: { type: String, required: true },
        hospiAddress: { type: String, required: true },
        isHospital: { type: Boolean, required: false, default: true },
        isGeneral: { type: Boolean, required: false, default: false },
        isPrivate: { type: Boolean, required: false, default: false },
        isChildrens: { type: Boolean, required: false, default: false },
        isClinic: { type: Boolean, required: false, default: false }
        
        // hospiType: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'HospitalType'
        // }

        // hospiLocation: { type: String, required: true }, --> geolocation
        // Hospital, General Hospital, Children's Hospital, Private Hospital, Clinic
    } 
);

exports.Hospital = mongoose.model('Hospital', hospitalSchema);