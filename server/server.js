const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
require('dotenv').config();

const postgresDB = knex({
  client: 'pg',
  connection: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: 'smart-brain',
  },
});

const app = express();

// parse the data
app.use(express.json());

// allows CORs policy
app.use(cors());

const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send(database.users);
});

app.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  postgresDB
    .select('email', 'hash')
    .from('login')
    .where('email', '=', email)
    .then((data) => {
      const result = bcrypt.compareSync(password, data[0].hash);
      if (result) {
        return postgresDB
          .select('*')
          .from('users')
          .where('email', '=', email)
          .then((user) => {
            res.json(user[0]);
          })
          .catch((err) => res.status(400).json('Unable to Login'));
      } else {
        res.status(400).json('Wrong Credentials');
      }
    })
    .catch((err) => res.status(400).json('Wrong Credentials'));
});

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  postgresDB
    .select('*')
    .from('users')
    .where({
      id,
    })
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      }
    })
    .catch((err) => res.status(400).json('Not found'));
});

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hash = await bcrypt.hash(password, saltRounds = 10);
  postgresDB.transaction(trx => {
    trx.insert({
      hash: hash,
      email: email
    })
      .into('login')
      .returning('email')
      .then(loginEmail => {
       return postgresDB('users')
          .returning('*')
          .insert({
            email: loginEmail[0].email,
            name: name,
            joined: new Date(),
          })
          .then((user) => {
            res.json(user[0]);
          })
      })
      .then(trx.commit)
      .catch(trx.rollback)
  })
    .catch((err) => res.status(400).json('Unable to register'));
});

app.put('/image', (req, res) => {
  const { id } = req.body;
  postgresDB('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then((entries) => {
      res.json(entries[0].entries);
    })
    .catch((err) => res.status(400).json('unable to get entries'));
});

app.listen(port, () => {
  console.log(`App is running on server ${port}`);
});
