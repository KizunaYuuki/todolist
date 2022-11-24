'use strict';

const express = require('express');
const todolist = require('../controllers/todolist.controller');
const info = require('../controllers/info.controller');

const router = express.Router();

router.route('/')
    .get(todolist.findAll)
    .post(todolist.create)
    .delete(todolist.deleteAll);

router.route('/loginshow')
    .get(info.AllUserShow);

router.route('/findAllTodolistByUer')
    .get(todolist.findAllTodolistByUer);

router.route('/login')
    .post(info.authenticate);
router.route('/logout')
    .get(info.logout);

router.route('/register')
    .post(info.register);

router.route('/complete')
    .get(todolist.findAllComplete);

router.route('/:id')
    .get(todolist.findOne)
    .put(todolist.update)
    .delete(todolist.delete);

module.exports = router;