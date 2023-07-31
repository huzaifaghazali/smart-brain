const bcrypt = require('bcrypt');

const { postgresDB } = require('../database/postgres');

const handleSignin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return Promise.reject('Incorrect form submission');
  }

  try {
    const data = await postgresDB
      .select('email', 'hash')
      .from('login')
      .where('email', '=', email);

    if (data.length === 0) {
      return Promise.reject('Wrong Credentials');
    }

    const result = await bcrypt.compare(password, data[0].hash);

    if (result) {
      const user = await postgresDB
        .select('*')
        .from('users')
        .where('email', '=', email);

      return user[0];
    } else {
      return Promise.reject('Unable to get user');
    }
  } catch (err) {
    Promise.reject('Wrong Credentials');
  }
};

const getAuthTokenId = () => {
  console.log('auth ok');
};

const signinAuthentication = async (req, res) => {
  const { authorization } = req.headers;
  try {
    if (authorization) {
      // If authorization header is present, call getAuthTokenId and handle the result
      getAuthTokenId();
    } else {
      // If no authorization header, handleSignin and handle the result
      const data = await handleSignin(req, res);

      res.json(data);
    }
  } catch (error) {
    // Handle any errors and send a 400 status with the error message
    res.status(400).json(error);
  }
};

module.exports = {
  handleSignin,
  signinAuthentication,
};
