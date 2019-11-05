const express = require('express')
const router = express.Router()
const { Client } = require('pg');

// const connectionString = 'postgres://postgres:postgres@localhost:5432/onboarding';
const connectionString = process.env.DATABASE_URL;
const client = new Client({
  connectionString: connectionString
});
client.connect();


router.post('/login', function (req, res, next) {

  console.log('checking credentials:');
  client.query(`SELECT * FROM public."user" where username='${req.body.username}'`, function (err, result) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    }

    if (result.rows.length === 0) { // if user doesnt exist
      console.log("create new user.")
      createUser(req.body, res)
    }
    else if (result.rows[0].password !== req.body.password) { //wrong passowrd
      res.status(200).send({ user: null, isAuthenticated: false })
    }
    else {  // user exists and password correct
      const user = {
        user_id: result.rows[0].id,
        username: result.rows[0].username
      }
      res.status(200).send({ user , isAuthenticated: true });
    }
  });

})

createUser = (params, res) =>
  client.query(
    `INSERT INTO public.user( username, password) VALUES ( '${params.username}', ${params.password});`,
    function (err, result) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
      const user = {
        id: result.rows[0].id,
        username: result.rows[0].username
      }
      res.status(200).send({ user, isAuthenticated: true })
    }
  );


module.exports = router;