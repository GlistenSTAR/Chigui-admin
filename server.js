const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const userRouter = require ('./routes/api/users');
const batteryRouter = require('./routes/api/battery');
const electronicRouter = require('./routes/api/electronic');
const carRouter = require('./routes/api/car');
const reviewRouter = require('./routes/api/review');
const oilRouter = require('./routes/api/oil');
const highlightRouter = require('./routes/api/highlight');
const quoteRouter = require('./routes/api/quote');
const servicesRouter = require ('./routes/api/services')

require('./config/passport')(passport);

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

mongoose.connect(db, { useNewUrlParser: true })
    .then(() =>
        console.log('MongoDB successfully connected.')
    ).catch(err => console.log(err));

app.use(passport.initialize());

app.use ('/api/user', userRouter);
app.use ('/api/battery', batteryRouter);
app.use ('/api/electronic', electronicRouter);
app.use ('/api/car',carRouter);
app.use ('/api/review', reviewRouter);
app.use ('/api/oil', oilRouter);
app.use ('/api/highlight', highlightRouter);
app.use ('/api/quote', quoteRouter);
app.use ('/api/services', servicesRouter);

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
