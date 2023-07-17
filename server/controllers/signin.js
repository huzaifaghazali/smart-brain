const handleSignin = (req, res, postgresDB, bcrypt) => {
   const { email, password } = req.body;

   if (!email || !password) {
      return res.status(400).json('Please fill out all the fields');
    }
 
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
 }

 module.exports = {
   handleSignin
 }