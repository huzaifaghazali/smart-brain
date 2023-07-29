const { handleSignin } = require('./signin');
const { handleRegister } = require('./register');
const { handleProfile, handleProfileUpdate } = require('./profile');
const { handleImage, handleApiCall } = require('./image');

module.exports = {
  handleSignin,
  handleRegister,
  handleProfile,
  handleImage,
  handleApiCall,
  handleProfileUpdate
};
