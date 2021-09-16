const express = require('express');
const router = express.Router();
const Electronic = require("../../models/Electronics");

router.post('/get', (req, res) => {
    
    Electronic.find({}).then(electronic => {
         if (electronic) {
             return res.status(200).send(electronic);
         }
     });
 });

router.post('/add', (req, res) => {
    Electronic.findOne({ name: req.body.name }).then(electronic => {
        if (electronic) {
            return res.status(400).json({ electronic: 'This electronic type already exists' });
        } else {
            const newElectronic = new Electronic({
                description: req.body.description,
                name: req.body.name,
                price: req.body.price,
                time: req.body.time
            });
            newElectronic
                .save()
                .then(electronic => {
                    return res.status(200).json(electronic)
                }).catch(err => console.log(err));
        }
    });
});

router.post('/update', (req, res) => {
    const _id = req.body._id;
    Electronic.findOne({ _id }).then(electronic => {
        if (electronic) {
            
            let update = {'description': req.body.description, 'name': req.body.name, 'price': req.body.price, 'time': req.body.time};
            Electronic.update({ _id: _id}, {$set: update}, function(err, result) {
                if (err) {
                    return res.status(400).json({ message: 'Unable to update electronic.' });
                } else {
                    console.log("success");
                    let updatedElectronic = {'description': req.body.description, 'name': req.body.name, 'price': req.body.price, 'time': req.body.time, 'id':req.body._id};
                    return res.status(200).json(updatedElectronic);
                }
            });
        } else {
            return res.status(400).json({ message: 'Now electronic found to update.' });
        }
    });
});

router.post('/delete', (req, res) => {
    Electronic.deleteOne({ _id: req.body._id}).then(electronic => {
        if (electronic) {
            let deleted_id = {'id': req.body._id};
            return res.status(200).json(deleted_id);
        }
    });
});

module.exports = router;