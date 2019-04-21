
const express = require('express');
const router = express.Router();

const { loginContoller, registerContoller } = require('../../controllers/auth');

//  http://localhost:3000/api/auth/logins
router.post('/login', loginContoller);

//  http://localhost:3000/api/auth/register
router.post('/register', registerContoller);


module.exports = router;
