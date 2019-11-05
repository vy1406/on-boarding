const express = require('express')
const router = express.Router()
const { Client } = require('pg');

const connectionString = 'postgres://postgres:postgres@localhost:5432/onboarding';
// const connectionString = process.env.DATABASE_URL;
const client = new Client({
  connectionString: connectionString
});
client.connect();

router.get('/', function (req, res, next) {
  console.log('getting projects by user_id: ' + req.query.user_id)
  client.query(`SELECT * FROM project WHERE user_id = '${req.query.user_id}'`, function (
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

  console.log('adding project:');
  const projectToAdd = {
    name: req.body.name,
    user_id: req.body.user_id,
    isDone: false,
    date: req.body.date
  }
  console.log(projectToAdd);

  client.query(
    `INSERT INTO project (user_id, name, isdone ,date) VALUES ('${projectToAdd.user_id}','${projectToAdd.name}', false ,'${projectToAdd.date}');`,
    function (err, result) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
      client.query(`SELECT * FROM project WHERE user_id = '${projectToAdd.user_id}'`, function (
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
  console.log('deleting project with id :' + req.body.project_id);

  client.query(`DELETE FROM project WHERE id = ${req.body.project_id};`, function (err, result) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    }
    client.query(`SELECT * FROM project WHERE user_id = '${req.body.user_id}'`, function (
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
  console.log('updating checked project');
  client.query(
    `UPDATE project SET isdone = (CASE WHEN (isdone = true) THEN false ELSE true END) WHERE id = ${req.body.project_id};`,
    function (err, result) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
      client.query(`SELECT * FROM project WHERE user_id = '${req.body.user_id}'`, function (
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

router.put('/updatename', function (req, res, next) {
  console.log('updating name project');
  client.query(
    `UPDATE project SET name = '${req.body.newProjectName}' WHERE id = ${req.body.project_id};`,
    function (err, result) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
      client.query(`SELECT * FROM project WHERE user_id = '${req.body.user_id}'`, function (
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