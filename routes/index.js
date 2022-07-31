const express = require('express');
const {
    getTodoList,
    getTodo,
    createTodo,
    updateTodo,
    removeTodo
} = require('../controllers/index');

const router = express.Router();



router
    .route('/')
    .get(getTodoList)
    .post(createTodo);

router
    .route('/:id')
    .get(getTodo)
    .put(updateTodo)
    .delete(removeTodo);

module.exports = router