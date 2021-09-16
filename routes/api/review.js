const express = require('express');
const router = express.Router();
const Review = require("../../models/Reviews");

router.post('/get', (req, res) => {
    Review.find({}).then(car => {
        if (car) {
             return res.status(200).send(car);
         }
     });
 });

 router.post('/add', (req, res) => {
    Review.findOne({ type: req.body.type }).then(review => {
        if (review) {
            return res.status(400).json({ review: 'This review type already exists' });
        } else {
            const newReview = new Review({
                type: req.body.type
            });
            newReview
                .save()
                .then(review => {
                    return res.status(200).json({message: 'review added successfully. Refreshing data...'})
                }).catch(err => console.log(err));
        }
    });
});

router.post('/update', (req, res) => {
    
    const _id = req.body._id;
    Review.findOne({ _id }).then(review => {
        if (review) {
            
            let update = {'type': req.body.type};
            Review.update({ _id: _id}, {$set: update}, function(err, result) {
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
    Review.deleteOne({ _id: req.body._id}).then(user => {
        if (user) {
            return res.status(200).json({message: 'User deleted successfully. Refreshing data...', success: true})
        }
    });
});

router.post('/detaildata/add', (req, res) => {
    const _id = req.body.id;
    Review.findOne({ _id }).then(review => {
        if (review) {
            
            let detaildata = {
                'subname': req.body.subname,
                'description': req.body.description,
                'price': req.body.price,
                'time': req.body.time
            };
            review.data.push(detaildata);
            let update = {'data': review.data};
            Review.updateOne({_id: _id}, {$set: update}, function(err, result) {
                if (err) {
                    return res.status(400).json({ message: 'Unable to add detaildata.'});

                } else {
                    console.log("success");
                    return res.status(200).json({ message: 'detaildata added successfully. Refreshing data...', success: true });
                }
            });

        } else {
            return res.status(400).json({ message: 'Now not found Reviewdata.'});
        }
    });
});

router.post('/detaildata/update', (req, res) => {
    const _id = req.body._id0;  
    Review.findOne({ _id }).then(review => {
        if (review?.data?.length > 0) {
            const data = review.data;
            const updatedData = data.map(item => {
                if (item._id == req.body._id) {
                    return { 
                    _id: req.body._id, 
                    subname: req.body.subname,
                    description:  req.body.description,
                    price: req.body.price,
                    time: req.body.time
                };
                } else {
                    return item;
                }
            });
            review.data = updatedData;
            let update = {'data': review.data};
            Review.updateOne({_id: _id}, {$set: update}, function(err, result) {
                if (err) {
                    return res.status(400).json({ message: 'Unable to update detaildata.'});

                } else {
                    console.log("success");
                    return res.status(200).json({ message: 'detaildata updated successfully. Refreshing data...', success: true });
                }
            });
        } else {
            return res.status(400).json({ message: 'Now not found Reviewdata.'});
        }
    })
});

router.post('/detaildata/delete', (req, res) => {
    const _id = req.body._id0;  
    Review.findOne({ _id }).then(review => {
        if (review?.data?.length > 0) {
            const updatedData = review.data;
            const matchedIndex = updatedData.findIndex(item => item._id == req.body._id);
            updatedData.splice(matchedIndex, 1);
            review.data = updatedData;
            let update = {'data': review.data};
            Review.updateOne({_id: _id}, {$set: update}, function(err, result) {
                if (err) {
                    return res.status(400).json({ message: 'Unable to delete detaildata.'});

                } else {
                    console.log("success");
                    return res.status(200).json({ message: 'detaildata delete successfully. Refreshing data...', success: true });
                }
            });
        } else {
            return res.status(400).json({ message: 'Now not found Reviewdata.'});
        }
    })
});

 module.exports = router;