const express = require('express');
const router = express.Router();
const FreeServices = require('../../models/FreeServices');

router.post('/get', (req, res) => {
    FreeServices.find({}).then(freeServices => {
        if (freeServices) {
            return res.status(200).send(freeServices);
        }
    });
});

router.post('/add', (req, res) => {
    FreeServices.findOne({ service_name: req.body.service_name }).then(freeServices => {
        if (freeServices) {
            return res.status(400).json({ freeServices: 'This free Services type already exists' });
        } else {
            const newFreeServices = new FreeServices({
                service_name: req.body.service_name,
                time: req.body.time,
                free: req.body.free,
                guarantee: req.body.guarantee
            });
            newFreeServices
                .save()
                .then(freeServices => {
                    return res.status(200).json(freeServices)
                }).catch(err => console.log(err));
        }
    });
});
//
// router.post('/update', (req, res) => {
//     const _id = req.body._id;
//     FreeServices.findOne({ _id }).then(freeServices => {
//         if (freeServices) {
//
//             let update = {'brand': req.body.brand, 'price': req.body.price, 'referrence': req.body.referrence};
//             FreeServices.update({ _id: _id}, {$set: update}, function(err, result) {
//                 if (err) {
//                     return res.status(400).json({ message: 'Unable to update freeServices.' });
//                 } else {
//                     console.log("success");
//                     let updatedfreeServices = {'brand': req.body.brand, 'price': req.body.price, 'referrence': req.body.referrence, 'id': req.body._id};
//                     return res.status(200).json(updatedfreeServices);
//                 }
//             });
//         } else {
//             return res.status(400).json({ message: 'Now freeServices found to update.' });
//         }
//     });
// });
//
// router.post('/delete', (req, res) => {
//     FreeServices.deleteOne({ _id: req.body._id}).then(freeServices => {
//         if (freeServices) {
//             let deleted_id = {'id': req.body._id};
//             return res.status(200).json(deleted_id);
//         }
//     });
// });

module.exports = router;