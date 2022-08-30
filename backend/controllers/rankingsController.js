const database = require('../models/scoreboard.js');
const { body, validationResult } = require('express-validator');

// Display current scoreboard rankings
exports.rankings = async function (req, res) {
    const myDb = await database.findTopFiveScores();
    res.status(200).send(myDb);
}

exports.rankings_create_get = async function (req, res) {
    const newRankName = req.query.input_name;
    const newRankScore = parseInt(req.query.input_score);
    const newRank = {
        name: newRankName,
        score: newRankScore,
        date_added: new Date()
    }

    // Add new rank into database
    await database.createRanking(newRank);
    
    // Reload page
    res.redirect('/');
};

exports.rankings_create_post = async function (req, res) {

    res.status(200).send(`IMPLEMENTATION IN PROGRESS: Rankings create POST`);
};

exports.rankings_update_get = async function (req, res) {
    // Access userId via: req.params.userId
    let requestParams = JSON.stringify(req.params.userId);
    res.status(200).send(`NOT IMPLEMENTED: Rankings update GET \nUpdate existing ranking to the database: ${requestParams}`);
};

exports.rankings_update_post = async function (req, res) {
    // Access userId via: req.params.userId
    res.status(200).send('NOT IMPLEMENTED: Rankings update POST');
};

exports.rankings_delete_get = async function (req, res) {
    // Access userId via: req.params.userId
    let requestParams = JSON.stringify(req.params.userId);
    res.status(200).send(`NOT IMPLEMENTED: Rankings delete GET \nDelete existing ranking from the database: ${requestParams}`);
};

exports.rankings_delete_post = async function (req, res) {
    // Access userId via: req.params.userId
    res.status(200).send('NOT IMPLEMENTED: Rankings delete POST');
};