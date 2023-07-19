require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');

const { postgresDB } = require('./database/postgres');

const {
  handleSignin,
  handleRegister,
  handleImage,
  handleProfile,
  handleApiCall
} = require('./controllers/');


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
