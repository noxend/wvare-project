const multer = require('multer');
const fs = require('fs-extra');
const path = require('path');

const tempPath = path.join('public', 'uploads', 'images', 'temp');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

const checkFileType = (file, cb) => {
  const fileTypes = /jpeg|jpg|png/;

  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    cb(null, true);
  } else {
    cb('Image only!');
  }
};

module.exports = upload;
