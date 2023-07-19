const bcrypt = require('bcrypt');

const { postgresDB } = require('../database/postgres');

const handleSignin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json('Please fill out all the fields');
  }

  try {
    const data = await postgresDB
      .select('email', 'hash')
      .from('login')
      .where('email', '=', email);

    if (data.length === 0) {
      return res.status(400).json('Wrong Credentials');
    }

    const result = await bcrypt.compare(password, data[0].hash);

    if (result) {
      const user = await postgresDB
        .select('*')
        .from('users')
        .where('email', '=', email);

      res.json(user[0]);
    } else {
      res.status(400).json('Wrong Credentials');
    }
  } catch (err) {
    res.status(400).json('Wrong Credentials');
  }
};

module.exports = {
  handleSignin,
};
