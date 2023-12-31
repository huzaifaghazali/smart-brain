const bcrypt = require('bcrypt');

const { postgresDB } = require('../database/postgres');
const { createSession, getAuthTokenId } = require('../utils')

const handleSignin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error('Incorrect form submission');
  }

  try {
    const data = await postgresDB
      .select('email', 'hash')
      .from('login')
      .where('email', '=', email);

    if (data.length === 0) {
      throw new Error('Wrong Credentials');
    }

    const result = await bcrypt.compare(password, data[0].hash);

    if (result) {
      const user = await postgresDB
        .select('*')
        .from('users')
        .where('email', '=', email);

      return user[0];
    } else {
      throw new Error('Unable to get user');
    }
  } catch (err) {
    throw new Error('Wrong Credentials');
  }
};

const signinAuthentication = async (req, res) => {
  const { authorization } = req.headers;
  try {
    if (authorization) {
      // If authorization header is present, call getAuthTokenId and handle the result
      getAuthTokenId(req, res);
    } else {
      // If no authorization header, handleSignin and handle the result
      const data = await handleSignin(req, res);
      if (data.id && data.email) {
        // If data has id and email properties, create session and send it in the response
        const session = await createSession(data);
        res.json(session);
      } else {
        // If data doesn't have id and email properties, reject with data
        throw data;
      }
    }
  } catch (error) {
    // Handle any errors and send a 400 status with the error message
    res.status(400).json(error);
  }
};

module.exports = {
  signinAuthentication,
};
