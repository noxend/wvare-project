const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const keys = require('../config/keys');
const errorHendler = require('../utils/errorHendler');
const { registerValidator } = require('../validation/auth');
const getRandomColor = require('../utils/randomColor');

const UserSchema = require('../models/User');

const loginContoller = async (req, res) => {
  const { login, password } = req.body;

  const checkUser = await UserSchema.findOne({ login: login });

  if (checkUser) {
    const passwordResult = await bcrypt.compare(password, checkUser.hashPass);
    if (passwordResult) {
      const token = jwt.sign({
        login: checkUser.login,
        userId: checkUser._id,
        role: checkUser.role,
        color: checkUser.color
      }, keys.jwt, { expiresIn: 60 * 60 });

      res.status(200).json({token: `Bearer ${token}` });
    } else {
      res.status(401).json({ msg: 'Some problem with the password' });
    }
  } else {
    res.status(404).json({ msg: 'User not found' });
  }
}

const registerContoller = async (req, res) => {

  const { errors, isOk } = registerValidator(req.body);

  if (!isOk) return res.status(409).json({ errors });

  const { email, login, password } = req.body;

  const checkLogin = await UserSchema.findOne({ login: login });
  const checkEmail = await UserSchema.findOne({ email: email });

  if (checkLogin) {
    return res.status(409).json({ msg: 'Користувач з таким логіном вже існує!' });
  } else if (checkEmail) {
    return res.status(409).json({ msg: 'Користувач з таким емейлом вже існує!' });
  } else {
    
    const salt = await bcrypt.genSalt(10);
    const { length: countDocuments } = await UserSchema.find();

    const user = new UserSchema({
      login: login,
      email: email,
      hashPass: bcrypt.hashSync(password, salt),
      role: (countDocuments === 0) ? 'ADMIN' : 'USER',
      color: getRandomColor()
    });

    try {
      await user.save();
      return res.status(201).json({ msg: 'user created', user });
    } catch (err) {
      errorHendler(res, err);
    }
  }
}

module.exports = {
  loginContoller,
  registerContoller
}
