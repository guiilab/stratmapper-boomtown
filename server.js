const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http')

const app = express();
const port = process.env.PORT || 5000;

const createEventModel = require('./client/models/dynamicEvents.js');
const MatchModel = require('./client/models/matches.js');
const LabelModel = require('./client/models/labels.js');

var suffix;
var EventModel;

app.use(bodyParser.urlencoded({
    limit: '500mb',
    extended: true
}));
app.use(bodyParser.json({
    limit: '500mb'
}));

const mongoUrl = 'mongodb://admin:M4pTh3W0rld@ds235243.mlab.com:35243/stratmapper_boomtown'

mongoose.Promise = global.Promise;
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.on('error', function callback() {
    console.log('\nEnsure that you are running a database. \nYou may need to start one with "$ sudo mongod" \nPlease see our README.md for more info. ')
});

db.once('open', function callback() {
    console.log('Initialized Connection with MongoDB.\n');
});

app.get('/api/matchentries', function (req, res) {
    return MatchModel
        .find({})
        .exec(function (err, entries) {
            return res.send(entries)
        })
})

app.post('/api/matches', function (req, res) {
    return MatchModel
        .find({
            file_name: req.body.matchId
        })
        .exec(function (err, match) {
            return res.send(match)
        })
})

app.post('/api/events', function (req, res) {
    if (EventModel) {
        delete db.models.Event;
    }
    suffix = req.body.matchId;
    EventModel = createEventModel(suffix)
    return EventModel
        .find({
            unit: req.body.unit,
            event_type: req.body.event_type,
            timestamp: { $gte: req.body.timestampRange.start, $lte: req.body.timestampRange.end }
        })
        .exec(function (err, events) {
            return res.send(events)
        })
})

app.post('/api/labels', function (req, res) {
    if (req.body.activeLabelTypes) {
        LabelModel
            .find({
                match: req.body.match,
                author: 'Jimmy2'
                // title: { $in: req.body.activeLabelTypes }
            })
            .exec(function (err, label) {
                return res.send(label)
            })
    } else {
        LabelModel
            .find({
                match: req.body.match,
                author: 'Jimmy'
            })
            .exec(function (err, label) {
                return res.send(label)
            })
    }
})

app.post('/api/add-label', function (req, res) {
    LabelModel
        .create({
            id: req.body.id,
            title: req.body.title,
            author: req.body.author,
            timestamp_range: req.body.timestamp_range,
            description: req.body.description,
            match: req.body.match,
            events: req.body.events,
            units: req.body.units,
            event_ids: req.body.event_ids
        }, function (err, label) {
            if (err) return handleError(err)
            return res.send(label)
        })
})

app.post('/api/delete-label', function (req, res) {
    LabelModel
        .deleteOne({
            id: req.body.id
        }, function (err, label) {
            if (err) return handleError(err);
            return res.send(label)
        })
})

app.post('/api/edit-label', function (req, res) {
    LabelModel
        .findOne({
            id: req.body.id
        }, function (err, label) {
            if (err) return handleError(err);
            label.set({
                title: req.body.title,
                author: req.body.author,
                description: req.body.description
            });
            label.save(function (err, updatedLabel) {
                if (err) return handleError(err);
                return res.send(updatedLabel)
            })
        })
})

if (process.env.NODE_ENV === 'production') {

    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));

    // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });

}
app.listen(port, () => console.log(`Listening on port ${port}`));