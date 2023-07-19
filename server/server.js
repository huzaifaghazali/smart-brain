require('dotenv').config();
const express = require('express');

const cors = require('cors');

// router
const apiRouter = require('./routes/apiRoutes');

const app = express();

// parse the data
app.use(express.json());

// allows CORs policy
app.use(cors());

const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('Smart brain');
});


// Routers middleware
app.use('/', apiRouter);

app.listen(port, () => {
  console.log(`App is running on server ${port}`);
});
