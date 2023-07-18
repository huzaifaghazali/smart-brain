const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
require('dotenv').config();

const {
  handleSignin,
  handleRegister,
  handleImage,
  handleProfile,
  handleApiCall
} = require('./controllers/');

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
  res.send('Smart brain');
});

app.post('/signin', (req, res) => {
  handleSignin(req, res, postgresDB, bcrypt);
});
app.post('/register', (req, res) => {
  handleRegister(req, res, postgresDB, bcrypt);
});

app.get('/profile/:id', (req, res) => {
  handleProfile(req, res, postgresDB);
});

app.put('/image', (req, res) => {
  handleImage(req, res, postgresDB);
});

app.post('/imageurl', (req, res) => { handleApiCall(req, res)})

app.listen(port, () => {
  console.log(`App is running on server ${port}`);
});
