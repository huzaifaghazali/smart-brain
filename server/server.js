const express = require('express');

const app = express();

const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
   res.send('This is working')
})

app.listen(port, () => {
   console.log(`App is running on server ${port}`);
})

/* 

/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user

*/