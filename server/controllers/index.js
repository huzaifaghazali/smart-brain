const { handleSignin } = require('./signin');
const { handleRegister } = require('./register');
const { handleProfile } = require('./profile');
const { handleImage } = require('./image');

module.exports = {
  handleSignin,
  handleRegister,
  handleProfile,
  handleImage,
};
