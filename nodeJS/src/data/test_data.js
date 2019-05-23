const mongoose = require('mongoose');
const userModel = mongoose.model('user');
const challengeModel = mongoose.model('challenge');

module.exports = {
    addChallenges: addChallenges,
    addUsers: addUsers
}

function addChallenges() {
    console.log("start")
    var challenge = new challengeModel({
        title: "Exercise 1",
        description: "Add a \"tooltip\" to the paragraph below with the text \"About W3Schools\".",
        task: "<p =\"About W3Schools\">W3Schools is a web developer's site.</p>",
        solution: "<p title=\"About W3Schools\">W3Schools is a web developer's site.</p>"
    });
    challenge.save(function (error) {
        if (error) console.log("DB error: can't add challenge");
        else console.log("DB: challenge added");
    })

    var challenge = new challengeModel({
        title: "Exercise 2",
        description: "Set the size of the image to 250 pixels wide and 400 pixels tall.",
        task: "<img src=\"w3schools.jpg\" width=\"\" height=\"\">",
        solution: "<img src=\"w3schools.jpg\" width=\"250\" height=\"400\">"
    });
    challenge.save(function (error) {
        if (error) console.log("DB error: can't add challenge");
        else console.log("DB: challenge added");
    })

    var challenge = new challengeModel({
        title: "Exercise 3",
        description: "Make the element below into a link that goes to \"https://www.w3schools.com\".",
        task: "<a \"https://www.w3schools.com\">This is a link</a>",
        solution: "<a href=\"https://www.w3schools.com\">This is a link</a> "
    });
    challenge.save(function (error) {
        if (error) console.log("DB error: can't add challenge");
        else console.log("DB: challenge added");
    })
}

function addUsers() {
    var user = new userModel({
        username: 'test_user1',
        password: 'test1234',
        masteryLevel: 0
    });
    user.save(function (error) {
        if (error) console.log("DB error: can't add user");
        else console.log("DB: user added");
    })

    var user = new userModel({
        username: 'test_user2',
        password: 'test1234',
        masteryLevel: 0
    });
    user.save(function (error) {
        if (error) console.log("DB error: can't add user");
        else console.log("DB: user added");
    })
}