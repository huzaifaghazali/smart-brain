const { postgresDB } = require('../database/postgres');

const handleRegister = async (req, res, bcrypt) => {
  const { name, email, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json('Please fill out all the fields');
  }

  try {
    const hash = await bcrypt.hash(password, 10);

    //  Database transaction is a sequence of multiple operations performed on a database,
    const loginEmail = await postgresDB.transaction(async (trx) => {
      // Within the transaction, it first inserts the hashed password and email into the "login" table
      const insertedEmail = await trx('login')
        .insert({
          hash: hash,
          email: email,
        })
        .returning('email'); // returns the email that was just inserted

      return insertedEmail[0].email;
    });

    // The value of loginEmail is then used as the email for the insertion into the "users" table, along with the name and the current date as the joined value. This information is inserted into the "users"
    const user = await postgresDB('users').returning('*').insert({
      email: loginEmail,
      name: name,
      joined: new Date(),
    });

    res.json(user[0]);
  } catch (err) {
    res.status(400).json('Unable to register');
  }
};

module.exports = {
  handleRegister,
};
