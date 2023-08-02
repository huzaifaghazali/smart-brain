const express = require('express');
const router = express.Router();

const { authenticateUser } = require('../middleware/authorization');

const {
  handleSignin,
  handleRegister,
  handleImage,
  handleProfile,
  handleApiCall,
  handleProfileUpdate,
  signinAuthentication,
} = require('../controllers');

router.post('/signin', signinAuthentication);

router.post('/register', handleRegister);

router
  .route('/profile/:id')
  .get(authenticateUser, handleProfile)
  .post(authenticateUser, handleProfileUpdate);

router.post('/imageurl', authenticateUser, handleApiCall);

router.put('/image', authenticateUser, handleImage);

module.exports = router;
