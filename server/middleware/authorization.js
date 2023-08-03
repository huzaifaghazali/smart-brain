// const redisClient = require('../controllers/signin').redisClient;
const redisClient = require('../utils').redisClient;

const authenticateUser = (req, res, next) => {
  const { authorization } = req.headers;

  // If there is not authorization headers
  if (!authorization) {
    return res.status(401).send('Unauthorized');
  }

  return redisClient.get(authorization, (err, reply) => {
    if (err || !reply) {
      return res.status(401).send('Unauthorized');
    }
    // If there is no error then go to the next function
    return next();
  });
};

module.exports = { authenticateUser };
