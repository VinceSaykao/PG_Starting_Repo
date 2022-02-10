const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Setup body parser - to translating request body into JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve "static assets" (html, css, client-side js)
// from the server/public folder
app.use(express.static('server/public'));

// Setup the songs router
// to respond to requests from the `/songs` URL
let songsRouter = require('./routes/songs.router');
app.use('/songs', songsRouter);


// Start express
const PORT = 5000;
app.listen(PORT, () => {
    console.log('up and running on port', PORT);
});


// Create(POST) = INSERT
// Read (GET) = SELECT
// Update (PUT) = UPDATE
// Delete (DELETE) = DELETE

// route parameter will help us give us additional info for GET request
// ex. want specific song -> server gets specific id for song -> database searches and gives back
// *** req.params is for DELETE, PUT, GET
// *** req.body is for POST, PUT

