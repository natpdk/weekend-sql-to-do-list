const router = require('express').Router();
const pool = require('../modules/pool');

//GET route in order to get all the todos from the database:

router.get('/', (req, res) => {
    const queryText = 'SELECT * FROM todos ORDER BY id;';
    pool.query(queryText)
        .then((result) => {
            console.log(result.rows);
            res.json(result.rows);
        })
        .catch((err) => {
            console.error('Error getting the todos from the database.', err);
            res.sendStatus(500);
    });
});

//POST route to add a new todo:
router.post('/', (req, res) => {
    const task = req.body.task;
    const queryText = 'INSERT INTO todos (task) VALUES ($1);';
    pool.query(queryText, [task] )
        .then(() => res.sendStatus(201))
        .catch((err) => {
            console.error('Error adding new todo.', err);
            res.sendStatus(500);
        });
});

//PUT route to update a task as completed:
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const queryText = 'UPDATE todos SET isComplete = TRUE WHERE id = $1;';
    pool.query(queryText, [id])
        .then(() => res.sendStatus(200))
        .catch((err) => {
            console.error('Error updating the todo.', err);
            res.sendStatus(500);
        });
});

//DELETE route to remove a todo:
router.delete('/:id', (req, red) =>{
    const id = req.params.id;
    const queryText = 'DELETE FROM todos WHERE id = $1;';
    pool.query(queryText, id)
        .then(() => res.sendStatus(200))
        .catch((err) => {
            console.error('Error deleting the todo.', err);
            res.sendStatus(500);
        });
});

module.exports = router;
