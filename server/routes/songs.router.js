const { text } = require('body-parser');
const express = require('express');
const router = express.Router();
// const pg = require('pg');
const pool = require('../modules/pool');

// router is handling speciic stuff, so it isn't all in server js but can be... 
// router we use pool, is handling our post and get request from client 

// pg provides us a pool of connections to the data base
// pg software what we use , parallel to express, is a framework
// pools get us to the database
// const Pool = pg.Pool; // Pool is a method, is part of node module. but const Pool can be Taco
// const pool = new Pool({
//     database: 'music_library', // the name of the database
//     host: 'localhost', // where our data base is
//     port: 5432, // will always be using with pg forpostgres, port for db 
//     max: 10, // how many connections or querys we can have at one time
//     idleTimeoutMillis: 30000 // these are in milli seconds that is 30 seconds to connect and then cancel query
// });

// this is not required for useful for debugging 
// pool.on('connect', () => {
//     console.log('PostgreSQL is connected!');
// });

// the pool will emit an error on behalf of any idle clients
// pool.on('error', (error) => {
//     console.log('error in postgreSQL');
// })

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

// :id can be taco but has to be below params.taco
// the colon grabs the params

// router.get('/:id', (req, res) => {
//     // res.send(songs);
//     // grabv a value from the request url
//     const idToGet = req.params.id;
//     let queryText = 'SELECT * FROM "songs" WHERE id=$1;'; // check SQL query text in Postico first
//     pool.query(queryText) // sending query to pool
//     // if it has bling, use them to put into array
//     // the second array argument is optional and is used when we add sanitized parameter to queryText
//     pool.query(queryText, [idToGet])
        
//         .then((result) => {
//             console.log('Song with id', idToGet)
//             res.send(result.rows);
//         })
//         .catch((err) => {
            
//             console.log('Error making query', idToGet, queryText, err);
//             res.sendStatus(500);
//         })
// });

router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "songs" ORDER BY "rank" DESC;';
    pool.query(queryText) // sending query to pool
    // if it has bling, use them to put into array
    // the second array argument is optional and is used when we add sanitized parameter to queryText
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((err) => {
            console.log('Error making query', queryText, err);
            res.sendStatus(500);
        })
});

router.post('/', (req, res) => {
    // songs.push(req.body);
    // res.sendStatus(200);
    const newSong = req.body;
    const queryText = `
        INSERT INTO "songs" ("artist", "track", "published", "rank")
        VALUES ($1,$2,$3,$4)  
    `;
    pool.query(queryText, [newSong.artist,newSong.track,newSong.published,newSong.rank]) //paramatized query
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log('Error querying', queryText, err);
            res.sendStatus(500);
        })
});

// DELETE must have a Where clause?
// the ":" -> product
router.delete('/:id', (req,res) => { //remember id can be taco
    let reqId = req.params.id; // but taco has to be replaced with id...
    console.log('DELETE id, reqId');
    let queryText = 'DELETE FROM "songs" WHERE "id" = $1;'
    pool.query(queryText, [reqId])
    .then((result) => {
        console.log('Song deleted');
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log('Error making database query', queryText, error);
        res.sendStatus(500);
    })
    
})

router.put('/:id', (req,res) => {
    let idToUpdate = req.params.id;
    console.log(idToUpdate);
    console.log(req.body);
 

    let sqlText = '';
    if(req.body.direction === 'down') {
        sqlText = `
        UPDATE "songs" 
        SET "rank" = "rank" + 1
        WHERE "id" = $1;
        `
    } else if (req.body.direction === 'up') {
        sqlText = `
        UPDATE "songs" 
        SET "rank" = "rank" - 1
        WHERE "id" = $1;
        `
    } else {
        // bad req...
        sendStatus(400);
        // so nothing else happens!
        return;
    }

    let sqlValues = [idToUpdate];

    pool.query(sqlText, sqlValues) //$1 is sqlValues
    .then(results => {
        res.sendStatus(200);
    }).catch(err => { //err can be taco lol
        res.sendStatus(500);
    })


})




module.exports = router;









// VALUES ('${newSong.artist}','${newSong.track}','${newSong.published}','${newSong.rank}')
// UPDATE: you need a WHERE and a SET
// A simple update would be like a like on a post OR things like updating a form
