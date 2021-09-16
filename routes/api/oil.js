const express = require('express');
const router = express.Router();
const Oil = require('../../models/Oils');

router.post('/get', (req, res) => {
   Oil.find({}).then(oil => {
        if (oil) {
            return res.status(200).send(oil);
        }
    });
});

router.post('/add', (req, res) => {
    Oil.findOne({ referr: req.body.referr }).then(oil => {
        if (oil) {
            return res.status(400).json({ oil: 'This oil type already exists' });
        } else {
            const newOil = new Oil({
                name: req.body.name,
                price: req.body.price,
                referr: req.body.referr
            });
            newOil
                .save()
                .then(oil => {
                    return res.status(200).json(oil)
                }).catch(err => console.log(err));
        }
    });
});

router.post('/update', (req, res) => {
    const _id = req.body._id;
    Oil.findOne({ _id }).then(oil => {
        if (oil) {
            
            let update = {'name': req.body.name, 'price': req.body.price, 'referr': req.body.referr};
            Oil.update({ _id: _id}, {$set: update}, function(err, result) {
                if (err) {
                    return res.status(400).json({ message: 'Unable to update oil.' });
                } else {
                    console.log("success");
                    let updatedoil = {'name': req.body.name, 'price': req.body.price, 'referr': req.body.referr, 'id': req.body._id};
                    return res.status(200).json(updatedoil);
                }
            });
        } else {
            return res.status(400).json({ message: 'Now oil found to update.' });
        }
    });
});

router.post('/delete', (req, res) => {
    Oil.deleteOne({ _id: req.body._id}).then(user => {
        if (user) {
            let deleted_id = {'id': req.body._id};
            return res.status(200).json(deleted_id);
        }
    });
});

module.exports = router;