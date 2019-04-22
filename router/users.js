const express = require('express');
const validateRegister = require('../validation/ValidateRegister')
const validateLogin = require('../validation/ValidateLogin');
const UserCtrl = require('../controllers/UserCtrl')
const router = express.Router()
const jwtSession = require('../controllers/jwtSession')

router.post('/register', async function (req, res) {
  try {
    validateRegister(req.body);
    if (req.body.password2) {
      delete req.body.password2;
    }
    const createdUser = await UserCtrl.createUser(req.body);
    return res.json(createdUser);
  } catch (err) {
    return res.status(err.status || 500).json(err || err.message);
  }
})

router.post('/login', async function (req, res) {
  try {
    let { email, password } = req.body;
    validateLogin(req.body);
    const result = await UserCtrl.getUserByEmail(email);
    if (!result || result.length === 0 || result.length > 1) {
      return res.status(500).json({ message: 'Something wrong with the user!!!' })
    }

    let foundUser = result[0];
    let jwtRes = await jwtSession(foundUser, password);
    return res.json(result[0])
  } catch (err) {
    return res.status(err.status || 500).json(err.message || err);
  }
})

module.exports = router