//similar to server file most of this will be reuseable

const pg = require('pg');

//get the Pool object from pg
const Pool = pg.Pool;

//make our own instance of a Pool from that template Pool object
//the database will change based on project
let config = {}

if( process.env.DATABASE_URL){
    config = {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false}
    }
}
else{
config = ({
    //running locally
    database: 'weekend-to-do-app',//THIS WILL CHANGE based on database name
    host: 'localhost',//connect to our local computer
    port: 5432, //port number, this is the default 
    max: 10, //max number of connections
    idleTimeoutMillis: 30000 //30 seconds
});
}

const pool = new Pool(config);
//When we connect to the database run a function 
pool.on('connect', () => {
    console.log(`connected to database...`);
})

pool.on('error', (error) => {
    console.log('error from pg', error);
})
//sending the pool out so we can bring it into another file
module.exports = pool;