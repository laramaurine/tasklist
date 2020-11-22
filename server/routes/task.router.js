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
    let queryText = `INSERT INTO "weekend-to-do-app" ("task")
                     VALUES ($1);`;
    pool.query(queryText, [newTask.task])
        .then(result => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log('error in adding new task', error);
            res.sendStatus(500);
        });
});


//router.delete
router.delete('/:taskId', (req, res) => {
    let id = req.params.taskId
    let sqlText = `DELETE FROM "weekend-to-do-app" WHERE id=$1;`;
    pool.query(sqlText, [id])
        .then( (result) => {
            res.sendStatus(200);
        })
        .catch( (error) => {
            console.log('error from db', error);
            res.sendStatus(500);
        })
})

//router.put



module.exports = router;