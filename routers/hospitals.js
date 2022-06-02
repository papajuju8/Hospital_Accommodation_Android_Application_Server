const { Hospital } = require('../models/hospitalModel');
const express = require('express');
const hospitalsRouter = express.Router();

hospitalsRouter.get(`/`, async (req, res)=>{
    const hospitalList = await Hospital.find();

    if(!hospitalList) {
        res.status(500).json({success: false})
    }

    res.send(hospitalList);
});

hospitalsRouter.get(`/:id`, async(req,res)=>{
    const hospital = await Hospital.findById(req.params.id);

    if(!hospital) {
        res.status(500).json({message: 'The hospital with the given ID was not found.'})
    } 
    res.status(200).send(hospital);
});

// Filter
hospitalsRouter.get(`/get/hospital`, async (req, res) => {
    const hospital = await Hospital.find({isHospital: true})

    if(!hospital) {
        res.status(500).json({success: false})
    }

    res.send(hospital);
});

hospitalsRouter.get(`/get/general`, async (req, res) => {
    const hospital = await Hospital.find({isGeneral: true})

    if(!hospital) {
        res.status(500).json({success: false})
    }

    res.send(hospital);
});

hospitalsRouter.get(`/get/private`, async (req, res) => {
    const hospital = await Hospital.find({isPrivate: true})

    if(!hospital) {
        res.status(500).json({success: false})
    }

    res.send(hospital);
});

hospitalsRouter.get(`/get/childrens`, async (req, res) => {
    const hospital = await Hospital.find({isChildrens: true})

    if(!hospital) {
        res.status(500).json({success: false})
    }

    res.send(hospital);
});

hospitalsRouter.get(`/get/clinic`, async (req, res) => {
    const hospital = await Hospital.find({isClinic: true})

    if(!hospital) {
        res.status(500).json({success: false})
    }

    res.send(hospital);
});

hospitalsRouter.post(`/`, async (req, res)=>{
    let hospital = new Hospital({
        hospiName: req.body.hospiName,
        hospiAddress: req.body.hospiAddress,
        isHospital: req.body.isHospital,
        isGeneral: req.body.isGeneral,
        isPrivate: req.body.isPrivate,
        isChildrens: req.body.isChildrens,
        isClinic: req.body.isClinic
    })
    hospital = await hospital.save();

    if(!hospital)
    return res.status(404).send('The hospital cannot be created!')

    res.send(hospital)
});

hospitalsRouter.put(`/:id`,async (req, res)=> {
    const hospital = await Hospital.findByIdAndUpdate(
        req.params.id,
        {
            hospiName: req.body.hospiName,
            hospiAddress: req.body.hospiAddress,
            hospiType: req.body.hospiType,
            isHospital: req.body.isHospital,
            isGeneral: req.body.isGeneral,
            isPrivate: req.body.isPrivate,
            isChildrens: req.body.isChildrens,
            isClinic: req.body.isClinic
        },
        { new: true }
    )

    if(!hospital)
    return res.status(400).send('The hospital cannot be updated!')

    res.send(hospital);
});

hospitalsRouter.delete(`/:id`, (req, res) => {
    Hospital.findByIdAndRemove(req.params.id).then(hospital => {
        if(hospital) {
            return res.status(200).json({success: true, message: 'The hospital is deleted.'})
        } else {
            return res.status(404).json({success: false, message: 'Hospital not found!'})
        }
    }).catch(err => {
        return res.status(400),json({success: false, error: err})
    })
});

module.exports = hospitalsRouter;