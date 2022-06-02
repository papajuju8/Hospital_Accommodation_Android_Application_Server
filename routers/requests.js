const express = require('express');
const requestsRouter = express.Router();
const { Request } = require('../models/requestModel');
const { RequestPatient } = require('../models/requestPatientModel');

requestsRouter.get(`/`, async (req, res)=>{
    const requestList = await Request.find();

    if(!requestList) {
        res.status(500).json({success: false})
    }

    res.send(requestList);
});

requestsRouter.post(`/`, async (req, res)=>{
    const requestPatientIds = Promise.all(req.body.requestPatient.map(async requestPatient => {
        let newRequestPatient = new RequestPatient({
            patient: requestPatient.patient,
        })

        newRequestPatient = await newRequestPatient.save();

        return newRequestPatient._id;
    }))

    const requestPatientIdsResolved = await requestPatientIds;
    console.log(requestPatientIdsResolved);

    let request = new Request({
        requestPatient: requestPatientIdsResolved,
        hospitalType: req.body.hospitalType,
        user: req.body.user,
        status: req.body.status,
        response: req.body.response,
        dateRequested: req.body.dateRequested,
    })
    // request = await request.save();

    if(!request)
    return res.status(404).send('The request cannot be created!')

    res.send(request)
});

// Hospital Update
// requestsRouter.put('/:id', async (req, res)=> {
//     const request = await Request.findByIdAndUpdate(
//         req.params.id,
//         {
//             status: req.body.status,
//             response: req.body.response
//         },
//         {new: true}
//     )

//     if(!request)
//     return res.status(400).send('The request cannot be updated!')

//     res.send(request);
// });

module.exports = requestsRouter;