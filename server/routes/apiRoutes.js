const express = require('express');
const router = express.Router();

const {
  handleSignin,
  handleRegister,
  handleImage,
  handleProfile,
  handleApiCall,
} = require('../controllers');

router.post('/signin', handleSignin);

router.post('/register', handleRegister);

router.get('/profile/:id', handleProfile);

router.post('/imageurl', handleApiCall);

router.put('/image', handleImage);

module.exports = router;
