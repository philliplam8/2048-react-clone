const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const scoreboard = require('./routes/scoreboard.js');

const PORT = 4000;
const app = express();

// Serving static files (images, CSS, JS files) in Express
// all files in the /public directory will now be available 
// (ex: http://localhost:3000/form.html, /index.js)
app.use(express.static(__dirname + '/public'))
    .use(cors())
    .use(cookieParser());

app.get('', async function (req, res) {
    res.status(200).sendFile(__dirname + '/public/form.html');
});

app.use('/scoreboard', scoreboard);

// Create a server and listen to it.
app.listen(PORT, () => {
    console.log(`Application is live and listening on port ${PORT}`);
});