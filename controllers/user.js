const User = require('../models/User');
const jimp = require('jimp');
const path = require('path');
const fs = require('fs-extra');

const Upload = require('../models/Upload');

const create = (req, res) => {
  res.json({ msg: 'POST' });
};

const getAll = (req, res) => {
  res.json({ msg: 'GET' });
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await User.findById(id).select({ hashPass: 0 });
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

    res.json({ msg: 'ok', result });
  } catch (err) {
    res.json({ msg: 'error', err });
  }
};

const uploadImageHeader = async (req, res) => {
  const { login } = req.user;
  const { path: imagePath, originalname, destination } = req.file;
  const ext = path.extname(originalname);
  const date = Date.now().toString(32);

  console.log(date);

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
  uploadImageHeader
};
