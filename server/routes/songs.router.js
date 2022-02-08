const express = require('express');
const router = express.Router();
const pg = require('pg');

// pools get us to the database
const Pool = pg.Pool; // Pool is a method, is part of node module. but const Pool can be Taco
const pool = new Pool({
    database: 'music_library', // the name of the database
    host: 'localhost', // where our data base is
    port: 5432, // will always be using with pg forpostgres, port for db 
    max: 10, // how many connections or querys we can have at one time
    idleTimeoutMillis: 30000 // these are in milli seconds that is 30 seconds to connect and then cancel query
});

// this is not required for useful for debugging 
pool.on('connect', () => {
    console.log('PostgreSQL is connected!');
});

// the pool will emit an error on behalf of any idle clients
pool.on('error', (error) => {
    console.log('error in postgreSQL');
})

let songs = [
    {
        rank: 355, 
        artist: 'Ke$ha', 
        track: 'Tik-Toc', 
        published: '1/1/2009'
    },
    {
        rank: 356, 
        artist: 'Gene Autry', 
        track: 'Rudolph, the Red-Nosed Reindeer', 
        published: '1/1/1949'
    },
    {
        rank: 357, 
        artist: 'Oasis', 
        track: 'Wonderwall', 
        published: '1/1/1996'
    }
];

router.get('/', (req, res) => {
    // res.send(songs);
    let queryText = 'SELECT * from "songs";'; // check SQL query text in Postico first
    pool.query(queryText) // sending query to pool
        .then((result) => {
            res.send(result.rows);
        })
        .catch((err) => {
            console.log('Error making query', queryText, err);
            res.sendStatus(500);
        })
});

router.post('/', (req, res) => {
    songs.push(req.body);
    res.sendStatus(200);
});

module.exports = router;