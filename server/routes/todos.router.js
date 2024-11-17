const router = require('express').Router();
const pool = require('../modules/pool');

//GET route in order to get all the todos from the database:

router.get('/', (req, res) => {
    const queryText = 'SELECT * FROM todos ORDER by id;';
    pool.query(queryText)
        .then((result) => res.json(result.rows))
        .catch((err) => {
            console.error('Error getting the todos from the database.', err);
            res.sendStatus(500);
    });
});

//POST route to add a new todo:
router.post('/', (req, res) => {
    const task = req.body;
    const queryText = 'INSERT INTO todos (task) VALUES ($1);';
    pool.query(queryText, [task] )
        .then(() => res.sendStatus(201))
        .catch((err) => {
            console.error('Error adding new todo.', err);
            res.sendStatus(500);
        });
});

module.exports = router;
