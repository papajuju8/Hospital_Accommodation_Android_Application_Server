const { Patient } = require('../models/patientModel');
const bcrypt = require('bcrypt');
const expressAsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const express = require('express');
const patientsRouter = express.Router();
const data = require('../data');

patientsRouter.get(`/`, async (req, res)=>{
    // const patientList = await Patient.find();
    const patientList = await Patient.find().select('-password');

    if(!patientList) {
        res.status(500).json({success: false})
    }
    res.send(patientList);
});

patientsRouter.get(
    '/seed',
    expressAsyncHandler(async (req, res) => {
        await Patient.remove({});
        const createdPatients = await Patient.insertMany(data.patients);
        res.send({ createdPatients });
    })
);

patientsRouter.post(`/`, (req, res)=>{
    const patient = new Patient({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        fullName: req.body.fullName,
        address: req.body.address,
        sex: req.body.sex,
        birthMonth: req.body.birthMonth,
        birthDate: req.body.birthDate,
        birthYear: req.body.birthYear,
        age: req.body.age,
        contact: req.body.contact,
        // date: req.body.date,
        // timeRequested: req.body.timeRequested,
        // timeResponded: req.body.timeResponded,
        // status: req.body.status,
        
        // Medical Information
        chkDiabetes: req.body.chkDiabetes,
        chkHeartDisease: req.body.chkHeartDisease,
        chkHeartFailure: req.body.chkHeartFailure,
        chkStroke: req.body.chkStroke,
        chkAsthma: req.body.chkAsthma,
        chkArthritis: req.body.chkArthritis,
        chkCOPD: req.body.chkCOPD,
        chkBloodPressure: req.body.chkBloodPressure,
        chkAlzheimer: req.body.chkAlzheimer,
        chkCancer: req.body.chkCancer,
        cancerInfo: req.body.cancerInfo,
        chkOthers: req.body.chkOthers,
        othersInfo: req.body.othersInfo,
        chkFood: req.body.chkFood,
        foodInfo: req.body.foodInfo,
        chkMedication: req.body.chkMedication,
        medicationInfo: req.body.medicationInfo,
        chkEnvironmental: req.body.chkEnvironmental,
        environmentalInfo: req.body.environmentalInfo,
        surgeryCount: req.body.surgeryCount,
        surgeryInfo: req.body.surgeryInfo,
        surgeryMonth: req.body.surgeryMonth,
        surgeryDate: req.body.surgeryDate,
        surgeryYear: req.body.surgeryYear,
        surgeryHospital: req.body.surgeryHospital
    })
    patient.save().then((createdPatient=>{
        res.status(201).json(createdPatient)
    })).catch((err)=>{
        res.status(500).json({
            error: err, 
            success: false
        });
        res.status(400).send("The user cannot be created");
    });
});

patientsRouter.post(`/login`, async (req, res)=>{
    const patient = await Patient.findOne({email: req.body.email});
    const secret = process.env.secret;

    if(!patient) {
        return res.status(400).send('The user is not found');
    };

    if(patient && bcrypt.compareSync(req.body.password, patient.password)) {
        const token = jwt.sign(
            {
                patientId: patient.id
            },
            secret,
            //{expiresIn: '30d'} no expiresIn, no expiration
        )

        res.status(200).send({patient: patient.email, token: token})
    } else {
        res.status(400).send('Password is incorrect')
    }
});

patientsRouter.post(`/register`, async(req, res)=>{
    let patient = new Patient(
        {
            _id: req.body._id,
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            fullName: req.body.fullName,
            address: req.body.address,
            sex: req.body.sex,
            birthMonth: req.body.birthMonth,
            birthDate: req.body.birthDate,
            birthYear: req.body.birthYear,
            age: req.body.age,
            contact: req.body.contact,
            // date: req.body.date,
            // timeRequested: req.body.timeRequested,
            // timeResponded: req.body.timeResponded,
            // status: req.body.status,
            
            // Medical Information
            chkDiabetes: req.body.chkDiabetes,
            chkHeartDisease: req.body.chkHeartDisease,
            chkHeartFailure: req.body.chkHeartFailure,
            chkStroke: req.body.chkStroke,
            chkAsthma: req.body.chkAsthma,
            chkArthritis: req.body.chkArthritis,
            chkCOPD: req.body.chkCOPD,
            chkBloodPressure: req.body.chkBloodPressure,
            chkAlzheimer: req.body.chkAlzheimer,
            chkCancer: req.body.chkCancer,
            cancerInfo: req.body.cancerInfo,
            chkOthers: req.body.chkOthers,
            othersInfo: req.body.othersInfo,
            chkFood: req.body.chkFood,
            foodInfo: req.body.foodInfo,
            chkMedication: req.body.chkMedication,
            medicationInfo: req.body.medicationInfo,
            chkEnvironmental: req.body.chkEnvironmental,
            environmentalInfo: req.body.environmentalInfo,
            surgeryCount: req.body.surgeryCount,
            surgeryInfo: req.body.surgeryInfo,
            surgeryMonth: req.body.surgeryMonth,
            surgeryDate: req.body.surgeryDate,
            surgeryYear: req.body.surgeryYear,
            surgeryHospital: req.body.surgeryHospital,
            createdAt: req.body.createdAt,
            updatedAt: req.body.updatedAt
        },
        {
            new: true
        }
    )
    patient = await patient.save();

    if(!patient)
    return res.status(400).send('The user cannot be created!')

    res.send(patient);
});

patientsRouter.get(`/:id`, async(req, res)=> {
    const patient = await Patient.findById(req.params.id).select('-password');

    if(!patient) {
        return res.status(500).json({message: 'The user with the given ID was not found.'});
    }
    return res.status(200).send(patient);
});

patientsRouter.get(`/get/count`, async (req, res) => {
    const patientCount = await Patient.countDocuments();

    if(!patientCount) {
        res.status(500).json({success: false})
    }
    res.send({
        patientCount: patientCount
    });
});

module.exports = patientsRouter;