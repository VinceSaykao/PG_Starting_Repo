const pg = require('pg');
const Pool = pg.Pool;
const config = {
    database: 'music_library',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
};

// pool purpose to connect us to the database
// modules are easier to seperate out things for organization 
// pool is actually an instance or function 
// Pool is a connection to the data
// create a new pool instance to manage our new connections
const pool = new Pool(config);

pool.on('connect', () => {
    console.log('Postgres is connected');
})

pool.on('error', (err) => {
    console.log('unexpected things', err);
})

// to allow access to this pool instance from other code

module.exports = pool;

