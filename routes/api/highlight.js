const express = require('express');
const router = express.Router();
const Highlight = require("../../models/Highlights");

router.post('/get', (req, res) => {
    Highlight.find({}).then(car => {
        if (car) {
             return res.status(200).send(car);
         }
     });
 });

 router.post('/add', (req, res) => {
    Highlight.findOne({ serviceName: req.body.serviceName }).then(highlight => {
        if (highlight) {
            return res.status(400).json({highlight: 'This review type already exists' });
        } else {
            const newHighlight = new Highlight({
                price: req.body.price,
                time: req.body.time,
                serviceName: req.body.serviceName
            });
            newHighlight
                .save()
                .then(highlight => {
                    return res.status(200).json({message: 'review added successfully. Refreshing data...'})
                }).catch(err => console.log(err));
        }
    });
});

router.post('/update', (req, res) => {
    
    const _id = req.body._id;
    Highlight.findOne({ _id }).then(highlight => {
        if (highlight) {
            
            let update = {'price': req.body.price,
                        'time': req.body.time,
                        'serviceName': req.body.serviceName};
            Highlight.update({ _id: _id}, {$set: update}, function(err, result) {
                if (err) {
                    return res.status(400).json({ message: 'Unable to update review.' });
                } else {
                    console.log("success");
                    return res.status(200).json({ message: 'Review updated successfully. Refreshing data...', success: true });
                }
            });
        } else {
            return res.status(400).json({ message: 'Now Review found to update.' });
        }
    });
});

router.post('/delete', (req, res) => {
    Highlight.deleteOne({ _id: req.body._id}).then(user => {
        if (user) {
            return res.status(200).json({message: 'User deleted successfully. Refreshing data...', success: true})
        }
    });
});

router.post('/service/add', (req, res) => {
    console.log("highlightService-add-controller", req.body);
    const _id = req.body.id;
    Highlight.findOne({ _id }).then(highlight => {
        if (highlight) {
            // console.log("service", highlight.data[0].detail);
            highlight.data[0].detail.push(req.body.service);
            let update = {'data': highlight.data};
            Highlight.updateOne({_id: _id}, {$set: update}, function(err, result) {
                if (err) {
                    return res.status(400).json({ message: 'Unable to add service.'});

                } else {
                    console.log("success");
                    return res.status(200).json({ message: 'service added successfully. Refreshing data...', success: true });
                }
            });

        } else {
            return res.status(400).json({ message: 'Now not found highlight.'});
        }
    });
});

router.post('/service/update', (req, res) => {
    console.log("service-update-controller", req.body);
    const _id = req.body.id;
    Highlight.findOne({ _id }).then(highlight => {
        if (highlight) {
            highlight.data[0].detail[req.body.index] = req.body.service;
            let update = {'data': highlight.data};
            Highlight.updateOne({_id: _id}, {$set: update}, function(err, result) {
                if (err) {
                    return res.status(400).json({ message: 'Unable to update service.'});

                } else {
                    console.log("success");
                    return res.status(200).json({ message: 'service updated successfully. Refreshing data...', success: true });
                }
            });

        } else {
            return res.status(400).json({ message: 'Now not found highlight.'});
        }
    });
});

router.post('/service/delete', (req, res) => {
    console.log("service-delete-controller", req.body);
    const _id = req.body.id;
    Highlight.findOne({ _id }).then(highlight => {
        if (highlight) {
            highlight.data[0].detail.splice(req.body.index, 1);
            let update = {'data': highlight.data};
            Highlight.updateOne({_id: _id}, {$set: update}, function(err, result) {
                if (err) {
                    return res.status(400).json({ message: 'Unable delete service.'});

                } else {
                    console.log("success");
                    return res.status(200).json({ message: 'service deleted successfully. Refreshing data...', success: true });
                }
            });

        } else {
            return res.status(400).json({ message: 'Now not found highlight.'});
        }
    });
});

 module.exports = router;