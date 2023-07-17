const handleRegister = async (req, res, postgresDB, bcrypt) => {
  const { name, email, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json('Please fill out all the fields');
  }
  const hash = await bcrypt.hash(password, (saltRounds = 10));
  postgresDB
    .transaction((trx) => {
      trx
        .insert({
          hash: hash,
          email: email,
        })
        .into('login')
        .returning('email')
        .then((loginEmail) => {
          return postgresDB('users')
            .returning('*')
            .insert({
              email: loginEmail[0].email,
              name: name,
              joined: new Date(),
            })
            .then((user) => {
              res.json(user[0]);
            });
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .catch((err) => res.status(400).json('Unable to register'));
};

module.exports = {
  handleRegister,
};
