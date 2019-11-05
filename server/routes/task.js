const express = require('express')
const router = express.Router()
const { Client } = require('pg');

// const connectionString = 'postgres://postgres:postgres@localhost:5432/onboarding';
const connectionString = process.env.DATABASE_URL;
const client = new Client({
  connectionString: connectionString
});
client.connect();


router.get('/', function (req, res, next) {
  console.log('getting tasks by project_id: ' + req.query.project_id)
  client.query(`SELECT * FROM task WHERE project_id = '${req.query.project_id}'`, function (
    err,
    result
  ) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    }
    res.status(200).send(result.rows);
  });
})

router.post('/', function (req, res, next) {

  console.log('adding task:');
  const taskToAdd = { project_id: req.body.project_id, description: req.body.description }
  console.log(taskToAdd);

  client.query(
    `INSERT INTO task (description, project_id, isdone) VALUES ('${req.body.description}','${req.body.project_id}', false );`,
    function (err, result) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
      client.query(`SELECT * FROM task WHERE project_id = '${req.body.project_id}'`, function (
        err,
        result
      ) {
        if (err) {
          console.log(err);
          res.status(400).send(err);
        }
        res.status(200).send(result.rows);
      });
    }
  );
})

router.delete('/', function (req, res, next) {
  console.log('deleting task with id :' + req.body.task_id);

  client.query(`DELETE FROM task WHERE id = ${req.body.task_id};`, function (err, result) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    }
    client.query(`SELECT * FROM task WHERE project_id = '${req.body.project_id}'`, function (
      err,
      result
    ) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
      res.status(200).send(result.rows);
    });
  });
});

router.put('/updatedone', function (req, res, next) {
  console.log('updating checked task');
  client.query(
    `UPDATE task SET isdone = (CASE WHEN (isdone = true) THEN false ELSE true END) WHERE id = ${req.body.task_id};`,
    function (err, result) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
      client.query(`SELECT * FROM task WHERE project_id = '${req.body.project_id}'`, function (
        err,
        result
      ) {
        if (err) {
          console.log(err);
          res.status(400).send(err);
        }
        res.status(200).send(result.rows);
      });
    }
  );
});

module.exports = router;