const express = require('express');
const router = express.Router();
const Quote = require("../../models/Quotes");

router.post('/get', (req, res) => {
    Quote.find({}).then(car => {
        if (car) {
             return res.status(200).send(car);
         }
     });
 });

 router.post('/add', (req, res) => {
    console.log("quote-add-controller",req.body);
    Quote.findOne({ detail: req.body.detail }).then(quote => {
        if (quote) {
            return res.status(400).json({ review: 'This quote type already exists' });
        } else {
            const newQuote = new Quote({
                name: req.body.name,
                email: req.body.email,
                phonenumber: req.body.phonenumber,
                detail: req.body.detail,
                date: req.body.date,
                time: req.body.time,
            });
            newQuote
                .save()
                .then(review => {
                    return res.status(200).json({message: 'review added successfully. Refreshing data...'})
                }).catch(err => console.log(err));
        }
    });
});

router.post('/update', (req, res) => {
    const _id = req.body._id;
    Quote.findOne({ _id }).then(quote => {
        if (quote) {
            
            let update = {'name': req.body.name, 'email': req.body.email, 'phonenumber': req.body.phonenumber,
        'detail': req.body.detail, 'date': req.body.date, 'time': req.body.time};
        Quote.update({ _id: _id}, {$set: update}, function(err, result) {
                if (err) {
                    return res.status(400).json({ message: 'Unable to update quote.' });
                } else {
                    console.log("success");
                    return res.status(200).json({ message: 'quote updated successfully. Refreshing data...', success: true });
                }
            });
        } else {
            return res.status(400).json({ message: 'Now quote found to update.' });
        }
    });
});

router.post('/delete', (req, res) => {
    Quote.deleteOne({ _id: req.body._id}).then(quote => {
        if (quote) {
            return res.status(200).json({message: 'Quote deleted successfully. Refreshing data...', success: true})
        }
    });
});

router.post('/service/update', (req, res) => {
    const _id = req.body._id0;  
    Quote.findOne({ _id }).then(quote => {
        if (quote?.services?.length > 0) {
            const data = quote.services;
            const updatedData = data.map(item => {
                if (item._id == req.body._id) {
                    return { 
                    _id: req.body._id, 
                    service_name: req.body.service_name,
                    price: req.body.price,
                    time: req.body.time
                };
                } else {
                    return item;
                }
            });
            quote.services = updatedData;
            let update = {'services': quote.services};
            console.log("data", update);
            Quote.updateOne({_id: _id}, {$set: update}, function(err, result) {
                if (err) {
                    return res.status(400).json({ message: 'Unable to update service.'});

                } else {
                    console.log("success");
                    return res.status(200).json({ message: 'service updated successfully. Refreshing data...', success: true });
                }
            });
        } else {
            return res.status(400).json({ message: 'Now not found service.'});
        }
    })
});

module.exports = router;