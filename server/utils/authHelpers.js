const jwt = require('jsonwebtoken');
const redis = require('redis');

const redisClient = redis.createClient({
  host: process.env.REDIS_URL,
  legacyMode: true,
});

async function redisConnect() {
  return await redisClient.connect();
}
redisConnect();

// Used to retrieve the user ID from the Redis store based on the provided authorization token.
function getAuthTokenId(req, res) {
   const { authorization } = req.headers;
   // This will return nil or ID of the user
   return redisClient.get(authorization, (err, reply) => {
     if (err || !reply) {
       return res.status(400).json('Unauthorized');
     }
     return res.json({ id: reply });
   });
 };
 

// generates a JSON Web Token (JWT) containing the user's email.
function signToken(email) {
  const jwtPayload = { email };
  return jwt.sign(jwtPayload, 'JWT_SECRET_KEY', { expiresIn: '2 days' });
}

// Stores a key-value pair in the Redis store.
function setToken(key, value) {
  return Promise.resolve(redisClient.set(key, value));
}

// Create session for the user after successful authentication
async function createSession(user) {
  try {
    const { email, id } = user;
    // Create JWT token , return user data
    const token = signToken(email);
    await setToken(token, id);
    return { success: 'true', userId: id, token, user };
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  signToken,
  setToken,
  createSession,
  redisClient,
  getAuthTokenId
};
