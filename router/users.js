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
    return res.status(err.status || 500).json(err.message || err);
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
    return res.json(jwtRes)
  } catch (err) {
    return res.status(err.status || 500).json(err);
  }
})

router.get('/:options', async function (req, res) {
  try {
    let result = await UserCtrl.getAllUsers(req.params.options);
    return res.json(result);

  } catch (err) {
    return res.status(err.status || 500).json(err.message || err);
  }
})

router.delete('/:id', async function (req, res) {
  try {
    const { id } = req.params;
    let deleted = await UserCtrl.delete(id)
    return res.json(deleted)
  } catch (err) {
    return res.status(err.status || 500).json(err.message || err);
  }
})

router.put('/:id', async function (req, res) {
  try {
    let result = await UserCtrl.update(req.body, req.params.id)
    return res.json(result)
  } catch (err) {
    return res.status(err.status || 500).json(err.message || err);
  }
})

module.exports = router;