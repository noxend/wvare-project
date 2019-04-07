require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const uuid = require('uuid/v1');

const app = express();

// const server = require('http').createServer();

const keys = require('./config/keys');

const { authRoutes, postRoutes, userRoutes } = require('./routes/api');

const upload = require('./utils/fileUploader');
const { imageProcessing } = require('./utils/imageProcessing.js');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => console.log(err));

mongoose.set('debug', true);
mongoose.set('useCreateIndex', true);

app.use(express.static('public'));
app.use(require('morgan')('dev'));
app.use(require('cors')());
app.use(require('body-parser').urlencoded({ extended: false }));
app.use(require('body-parser').json());

app.use(passport.initialize());
require('./middleware/passport')(passport);

app.post('/api/upload', upload.any('img'), (req, res) => {
  const { title } = req.body;
  imageProcessing(req.files, uuid(), (names) => {
    res.json(names);
  });
  // res.sendStatus(200);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/user', userRoutes);


const Room = require('./models/Room');
const Message = require('./models/Message');

// app.post('/api/messages', passport.authenticate('jwt', { session: false }), async (req, res) => {

//   const room = new Room({
//     name: 'New Name',
//     users: [ '5c6c4d2201fa2647449527f7', '5c6ceceba714ab26bc983def' ]
//   });

//   const message = new Message({
//     room: '5c94ebd19cde360390fd8ed1',
//     user: '5c6c4d2201fa2647449527f7',
//     textMessage: 'lorem ipsum dolor'
//   });

//   await message.save();

//   res.send('working');
// });


module.exports = app;