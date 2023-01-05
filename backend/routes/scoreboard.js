// scoreboard.js - scoreboard route module

let express = require('express');
let router = express.Router();
const rankingsController = require('../controllers/rankingsController.js');

// Home page route
router.get('/', function (req, res) {
    res.status(200).send('/scoreboard/')
    // res.redirect('/rankings');
});

// Display current Scoreboard.
router.get('/rankings', rankingsController.rankings);

// Display Ranking create form on GET.
router.get('/rankings/create', rankingsController.rankings_create_get);
// Handle Ranking create on POST.
router.post('/rankings/:name/:score/create', rankingsController.rankings_create_post);

// Display Ranking update form on GET.
router.get('/rankings/:userId/update', rankingsController.rankings_update_get);
// Handle Ranking update on POST.
router.post('/rankings/:userId/update', rankingsController.rankings_update_post);

// Display Ranking delete form on GET.
router.get('/rankings/:userId/delete', rankingsController.rankings_delete_get);
// Handle Ranking delete on POST.
router.post('/rankings/:userId/delete', rankingsController.rankings_delete_post);

module.exports = router;