require('dotenv').config();
const express = require('express');

const cors = require('cors');
const morgan = require('morgan');

// router
const apiRouter = require('./routes/apiRoutes');

// middleware
const notFoundMiddleware = require('./middleware/notFound');

const app = express();

app.use(morgan('tiny')); // logging request details
app.use(express.json()); // parse the data
app.use(cors()); // allows CORs policy

const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('Smart brain');
});


// Routers middleware
app.use('/', apiRouter);

app.use(notFoundMiddleware);

app.listen(port, () => {
  console.log(`App is running on server ${port}`);
});
