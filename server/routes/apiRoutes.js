const express = require('express');
const router = express.Router();

const {
  handleSignin,
  handleRegister,
  handleImage,
  handleProfile,
  handleApiCall,
  handleProfileUpdate,
  signinAuthentication
} = require('../controllers');

router.post('/signin', signinAuthentication);

router.post('/register', handleRegister);

router.route('/profile/:id').get(handleProfile).post(handleProfileUpdate);

router.post('/imageurl', handleApiCall);

router.put('/image', handleImage);

module.exports = router;
