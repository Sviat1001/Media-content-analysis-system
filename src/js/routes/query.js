'use strict'

const express = require('express');

const { executeSql } = require('./routes.js');

const query = {
  createQuery: `INSERT INTO query (title, user_id, role_id, source_id) VALUE (:title, :user_id, :role_id, :source_id)`,
  readQuery: `SELECT * FROM query WHERE id = :id`,
  readAllQueries: `SELECT * FROM query`,
  updateQuery: `UPDATE query SET title = :title, user_id = :user_id, role_id = :role_id, source_id = :source_id WHERE id = :id`,
  deleteQuery: `DELETE FROM query WHERE id = :id`,
};

const router = new express.Router();

router.post('/', async (req, res) => {
  try {
    await executeSql(query.createQuery, req.body);
    let result = await executeSql(query.readQuery, req.params);
    res.status(200).send(result);
  } catch (e) {
    console.log(e);
    return res.status(500).send(`Something bad happened...`);
  }
});

router.get('/', async (req, res) => {
  try {
    let result = await executeSql(query.readAllQueries, req.params);
    res.status(200).send(result);
  } catch (e) {
    console.log(e);
    return res.status(500).send(`Something bad happened...`);
  }
});

router.get('/:id', async (req, res) => {
  try {
    let result = await executeSql(query.readQuery, req.params);
    res.status(200).send(result);
  } catch (e) {
    console.log(e);
    return res.status(500).send(`Something bad happened...`);
  }
});

router.put('/:id', async (req, res) => {
  try {
    await executeSql(query.updateQuery, { ...req.body, ...req.params });
    let result = await executeSql(query.readQuery, req.params);
      res.status(200).send(result);
  } catch (e) {
    console.log(e);
    return res.status(500).send(`Something bad happened...`);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    let result = await executeSql(query.readQuery, req.params);
    await executeSql(query.deleteQuery, req.params);
    res.status(200).send(result);
  } catch (e) {
    console.log(e);
    return res.status(500).send(`Something bad happened...`);
  }
});

module.exports = router;