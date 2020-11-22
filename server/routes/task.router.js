const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

//router.get 
router.get('/', (req, res) => {
    console.log('will this work');
    let queryText = 'SELECT * FROM "weekend-to-do-app" ORDER BY "id";';
    pool.query(queryText).then(result => {
        res.send(result.rows);
    }) 
    .catch(error => {
        console.log('error in getting tasks', error);
        res.sendStatus(500);
    });   
})
    
 
router.post('/', (req, res) => {
    let newTask = req.body;
    console.log('adding task', newTask);
    let queryText = `INSERT INTO "weekend-to-do-app" ("task", "status")
                        VALUES ($1, $2);`;
    pool.query(queryText, [newTask.task, newTask.status])
        .then(result => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log('error in adding new task', error);
            res.sendStatus(500);
        });
});


//router.delete

//router.put



module.exports = router;