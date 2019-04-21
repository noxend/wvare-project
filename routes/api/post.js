const express = require('express');
const router = express.Router();
const passport = require('passport');
const upload = require('../../utils/fileUploader');
const jimp = require('jimp');
const path = require('path');
const fs = require('fs-extra');

const Upload = require('../../models/Upload');
const Post = require('../../models/Post');
const User = require('../../models/User');

const {
  getAll,
  getById,
  create,
  update,
  remove,
  getUsersPosts,
  putLike
} = require('../../controllers/post');

// passport.authenticate('jwt', { session: false })
router.get('/get-all-posts', getAll);
router.get('/get-post-by-id/:id', getById);
router.post('/', create);
router.delete('/:id', remove);
router.put('update-post-by-id/:id', update);

router.delete('/delete-image', (req, res) => {});

//GET USER'S POSTS
router.get('/get-users-posts/:id', getUsersPosts);

// UPLOAD HEADER IMAGE
router.post('/upload-image-header', upload.single('file'), async (req, res) => {
  const { path: imagePath, originalname, destination } = req.file;
  const ext = path.extname(originalname);

  const finalPath = path.join(
    'public',
    'uploads',
    'images',
    'posts',
    originalname,
    originalname
  );

  const upload = new Upload({
    path: `${originalname}/${originalname}`
  });

  await jimp.read(imagePath).then(image => {
    image.cover(560, 320).writeAsync(finalPath);
  });

  await upload.save();

  await fs
    .readdir(destination)
    .then(data => {
      data.forEach(el => {
        fs.remove(path.join(destination, el)).catch(err => console.error(err));
      });
    })
    .catch(err => console.error(err));

  res.json({ upload });
});

router.post(
  '/init-post',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { id: url } = req.body;
    const { _id } = req.user;

    const post = new Post({
      user: _id,
      link: url
    });

    // await User.findByIdAndUpdate({ _id }, { $push: { ownPosts: post._id } });

    await post.save();
    res.json(post);
  }
);

router.put(
  '/put-like/:id',
  passport.authenticate('jwt', { session: false }),
  putLike
);

module.exports = router;
