const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const redis = require('redis');

const { postgresDB } = require('../database/postgres');

// You will want to update your host to the proper address.
const redisClient = redis.createClient({
  host: process.env.REDIS_URL,
  legacyMode: true,
});

async function redisConnect() {
  return await redisClient.connect();
}
redisConnect();

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

// Get the user ID
const getAuthTokenId = (req, res) => {
  const { authorization } = req.headers;
  // This will return nil or ID of the user
  return redisClient.get(authorization, (err, reply) => {
    if (err || !reply) {
      return res.status(400).json('Unauthorized');
    }
    return res.json({ id: reply });
  });
};

// Create Token
const signToken = (email) => {
  const jwtPayload = { email };
  return jwt.sign(jwtPayload, 'JWT_SECRET_KEY', { expiresIn: '2 days' });
};

// Store the token into the redis
const setToken = (key, value) => Promise.resolve(redisClient.set(key, value));

// Create Session
const createSession = async (user) => {
  try {
    // Create JWT token , return user data
    const { email, id } = user;
    const token = signToken(email);
    await setToken(token, id);
    return { success: 'true', userId: id, token, user };
  } catch (error) {
    console.log(error);
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
  handleSignin,
  signinAuthentication,
};
