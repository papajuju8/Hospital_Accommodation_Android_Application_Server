const mongoose = require('mongoose');

const patientSchema = mongoose.Schema(
    {
        // _id: { type: Number, unique: true },
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        fullName: { type: String, required: true },
        address: { type: String, required: true },
        // geolocation: ,
        sex: { type: String, required: true },
        birthMonth: { type: Number, required: true },
        birthDate: { type: Number, required: true },
        birthYear: { type: Number, required: true },
        age: { type: Number, required: false },
        contact: { type: Number, required: true },
        date: { type: Date, default: Date.now },
        timeRequested: { type: String, required: true },
        timeResponded: { type: String, required: false },
        status: { type: String, required: false },

        // Medical Information
        chkDiabetes: { type: Boolean, default: false, required: false },
        chkHeartDisease: { type: Boolean, default: false, required: false },
        chkHeartFailure: { type: Boolean, default: false, required: false },
        chkStroke: { type: Boolean, default: false, required: false },
        chkAsthma: { type: Boolean, default: false, required: false },
        chkArthritis: { type: Boolean, default: false, required: false },
        chkCOPD: { type: Boolean, default: false, required: false },
        chkBloodPressure: { type: Boolean, default: false, required: false },
        chkAlzheimer: { type: Boolean, default: false, required: false },
        chkCancer: { type: Boolean, default: false, required: false },
        cancerInfo: { type: String, required: false },
        chkOthers: { type: Boolean, default: false, required: false },
        othersInfo: { type: String, required: false },
        chkFood: { type: Boolean, default: false, required: false },
        foodInfo: { type: String, required: false },
        chkMedication: { type: Boolean, default: false, required: false },
        medicationInfo: { type: String, required: false },
        chkEnvironmental: { type: Boolean, default: false, required: false },
        environmentalInfo: { type: String, required: false },
        surgeryCount: { type: Number, required: false },
        surgeryInfo: { type: String, required: false },
        surgeryMonth: { type: Number, required: false },
        surgeryDate: { type: Number, required: false },
        surgeryYear: { type: Number, required: false },
        surgeryHospital: { type: String, required: false },
    },
    {
        timestamps: true,
    }
);

exports.Patient = mongoose.model('Patient', patientSchema);