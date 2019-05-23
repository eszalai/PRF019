const express = require('express');
const mongoose = require('mongoose');
const userModel = mongoose.model('user');
const challengeModel = mongoose.model('challenge');
var router = express.Router();

router.route('/').get(function (req, res) {
    if (req.isAuthenticated()) {
        challengeModel.find({}, function (error, challenges) {
            if (error) return res.status(500).send(error);
            return res.status(200).send(challenges);
        })
    } else {
        return res.status(403).send({ message: "Unauthorized access" });
    }
}).post(function (req, res) {
    if (req.isAuthenticated()) {
        if (!req.body.title || !req.body.description || !req.body.task || !req.body.solution) {
            return res.status(404).send(
                { message: "Missing data" });
        } else {
            var challenge = new challengeModel({
                title: req.body.title,
                description: req.body.description,
                task: req.body.task,
                solution: req.body.solution
            });
            challenge.save(function (error) {
                if (error) return res.status(500).send({ message: "db error" });
                return res.status(200).send({ message: challenge });
            })
        }
    } else {
        return res.status(403).send({ message: "Unauthorized access" });
    }
});

router.route('/:challengeId').get(function (req, res) {
    if (req.isAuthenticated()) {
        challengeModel.findOne({ _id: req.params.challengeId }, function (error, challenge) {
            if (error) return res.status(500).send(error);
            return res.status(200).send(challenge);
        })
    } else {
        return res.status(403).send({ message: "Unauthorized access" });
    }
})

router.route('/:challengeId/solved').put(function (req, res) {
    if (req.isAuthenticated()) {        
        userModel.findOne({ username: req.user.username }, function (error, user) {
            if (error) return res.status(500).send({ message: "db error" });
            if (!user.solvedChallenges) {
                user.solvedChallenges = [req.params.challengeId];
                user.masteryLevel = 1;
            } else {
                if(user.solvedChallenges.includes(req.params.challengeId))
                    return res.status(500).send({ message: "challengeId duplication" });
                user.solvedChallenges.push(req.params.challengeId);
                user.masteryLevel = user.masteryLevel + 1;
            }
            userModel.findOneAndUpdate({ username: req.user.username },
                user, { "new": true},
                function (error, updatedUser) {
                if (error) return res.status(500).send({ message: "db error" });
                return res.status(200).send(updatedUser);
            });
        });
    } else {
        return res.status(403).send({ message: "Unauthorized access" });
    }
})

module.exports = router;