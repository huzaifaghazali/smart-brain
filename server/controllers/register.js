const handleRegister = async (req, res, postgresDB, bcrypt) => {
  const { name, email, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json('Please fill out all the fields');
  }

  try {
    const hash = await bcrypt.hash(password, 10);

    const loginEmail = await postgresDB.transaction(async (trx) => {
      const insertedEmail = await trx('login')
        .insert({
          hash: hash,
          email: email,
        })
        .returning('email');

      return insertedEmail[0].email;
    });

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
