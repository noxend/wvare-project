const jimp = require('jimp');
const path = require('path');
const fs = require('fs-extra');

const Upload = require('../models/Upload');
const Relationship = require('../models/Relationship');
const User = require('../models/User');

const create = (req, res) => {
  res.json({ msg: 'POST' });
};

const getAll = (req, res) => {
  res.json({ msg: 'GET' });
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await User.findById(id)
      .select({ hashPass: 0 })
      .populate('imageSrc')
      .populate('profileImageHeader');
    res.json({ msg: 'ok', result });
  } catch (err) {
    res.json({ msg: 'error', err });
  }
};

const getUserByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const result = await User.findOne({
      login: username
    })
      .select({ hashPass: 0 })
      .populate('profileImageHeader')
      .populate('imageSrc');

    res.json({ msg: 'ok', result });
  } catch (err) {
    res.json({ msg: 'error', err });
  }
};

const uploadUserImage = async (req, res) => {
  const { login } = req.user;
  const { path: imagePath, originalname, destination } = req.file;
  const ext = path.extname(originalname);
  const num = Math.floor(Math.random() * 100);
  const randomString = Math.floor(Date.now() / num + num).toString(32);
  const id = `t${Date.now().toString(32)}_${randomString}`;

  const finalPath = path.join(
    'public',
    'uploads',
    'images',
    'users',
    login,
    `${id}_640${ext}`
  );

  const upload = new Upload({
    path: `${login}/${id}_640${ext}`
  });

  try {
    await jimp.read(imagePath).then(image => {
      image
        .cover(640, 640)
        .quality(80)
        .write(finalPath);
    });

    await upload.save();

    fs.readdir(destination)
      .then(data => {
        data.forEach(el => {
          fs.remove(path.join(destination, el)).catch(err => {
            throw new Error(err);
          });
        });
      })
      .catch(err => {
        throw new Error(err);
      });

    await User.findOneAndUpdate(
      { login },
      {
        imageSrc: upload._id
      }
    );

    res.json({ upload });
  } catch (err) {
    res.json({ err });
  }
};

const uploadImageHeader = async (req, res) => {
  const { login } = req.user;
  const { path: imagePath, originalname, destination } = req.file;
  const ext = path.extname(originalname);
  const date = Date.now().toString(32);

  const finalPath = path.join(
    'public',
    'uploads',
    'images',
    'users',
    login,
    `${date}${ext}`
  );

  const upload = new Upload({
    path: `${login}/${date}${ext}`
  });

  try {
    await jimp.read(imagePath).then(image => {
      image
        .cover(1110, 340)
        .quality(80)
        .write(finalPath);
    });

    await upload.save();

    fs.readdir(destination)
      .then(data => {
        data.forEach(el => {
          fs.remove(path.join(destination, el)).catch(err =>
            console.error(err)
          );
        });
      })
      .catch(err => console.error(err));

    await User.findOneAndUpdate(
      { login },
      {
        profileImageHeader: upload._id
      }
    );

    res.json({ upload });
  } catch (err) {
    res.json({ err });
  }
};

const userRelations = async (req, res) => {
  const relationship = new Relationship({
    firstUser: '5c7928b5ba9c314da4250566',
    secondUser: '5cadc90e7510ad29a82e21eb',
    status: 1,
    actionUser: '5c7928b5ba9c314da4250566'
  });
  await relationship.save();
  res.json({ relationship });
};

const getFriends = async (req, res) => {
  const { username } = req.params;

  const { _id } = await User.findOne({ login: username });

  const result = await Relationship.find({
    $or: [{ firstUser: _id }, { secondUser: _id }],
    status: 1
  })
    .populate({ path: 'firstUser', populate: { path: 'imageSrc' } })
    .populate({ path: 'firstUser', populate: { path: 'profileImageHeader' } })
    .populate({ path: 'secondUser', populate: { path: 'imageSrc' } })
    .populate({ path: 'secondUser', populate: { path: 'profileImageHeader' } })

  res.json({ result });
};

const remove = (req, res) => {
  res.json({ msg: 'DELETE' });
};

const update = (req, res) => {
  res.json({ msg: 'PUT' });
};

module.exports = {
  create,
  getAll,
  getById,
  remove,
  update,
  getUserByUsername,
  uploadImageHeader,
  uploadUserImage,
  userRelations,
  getFriends
};
