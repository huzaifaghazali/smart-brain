const express = require('express');

const app = express();

// parse the data 
app.use(express.json());

const database = {
   users: [
      {
         id: '123',
         name: 'John',
         email: 'john@gmail.com',
         password: 'cookies',
         entries: 0,
         joined: new Date()
      },
      {
         id: '124',
         name: 'Sally',
         email: 'sally@gmail.com',
         password: 'bananas',
         entries: 0,
         joined: new Date()
      },
   ]
}

const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('This is working');
});

app.post('/signin', (req, res) => {
   const {email, password} = req.body;
   if(email === database.users[0].email && password === database.users[0].password) {
      res.json('success');
   } else {
      res.status(404).json('error logging in')
   }
});

app.post('/register', (req, res) => {
  res.json('Register');
});


app.listen(port, () => {
  console.log(`App is running on server ${port}`);
});

/* 

/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user

*/