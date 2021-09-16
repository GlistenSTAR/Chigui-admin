const express = require('express');
const router = express.Router();
const Battery = require('../../models/Battery');

router.post('/get', (req, res) => {
   Battery.find({}).then(battery => {
        if (battery) {
            return res.status(200).send(battery);
        }
    });
});

router.post('/add', (req, res) => {
    Battery.findOne({ referrence: req.body.referrence }).then(battery => {
        if (battery) {
            return res.status(400).json({ battery: 'This battery type already exists' });
        } else {
            const newBattery = new Battery({
                brand: req.body.brand,
                price: req.body.price,
                referrence: req.body.referrence
            });
            newBattery
                .save()
                .then(battery => {
                    // battery.message='battery added successfully. Refreshing data...';
                    return res.status(200).json(battery)
                }).catch(err => console.log(err));
        }
    });
});

router.post('/update', (req, res) => {
    const _id = req.body._id;
    Battery.findOne({ _id }).then(battery => {
        if (battery) {
            
            let update = {'brand': req.body.brand, 'price': req.body.price, 'referrence': req.body.referrence};
            Battery.update({ _id: _id}, {$set: update}, function(err, result) {
                if (err) {
                    return res.status(400).json({ message: 'Unable to update battery.' });
                } else {
                    console.log("success");
                    let updatedbattery = {'brand': req.body.brand, 'price': req.body.price, 'referrence': req.body.referrence, 'id': req.body._id};
                    return res.status(200).json(updatedbattery);
                }
            });
        } else {
            return res.status(400).json({ message: 'Now battery found to update.' });
        }
    });
});

router.post('/delete', (req, res) => {
    Battery.deleteOne({ _id: req.body._id}).then(battery => {
        if (battery) {
        let deleted_id = {'id': req.body._id};
            return res.status(200).json(deleted_id);
        }
    });
});

module.exports = router;