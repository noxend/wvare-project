const express = require('express');
const router = express.Router();
const passport = require('passport');
const upload = require('../../utils/fileUploader');
const jimp = require('jimp');
const path = require('path');
const fs = require('fs-extra');


const Upload = require('../../models/Upload');
const Post = require('../../models/Post');

const {
  getAll,
  getById,
  create,
  update,
  remove
} = require('../../controllers/post');

// passport.authenticate('jwt', { session: false })
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.delete('/:id', remove);
router.put('/:id', update);

router.delete('/delete-image', (req, res) => {});

// UPLOAD HEADER IMAGE
router.post('/upload-image-header', upload.single('file'), async (req, res) => {
  
  const { path: imagePath, originalname, destination } = req.file;
  const ext = path.extname(originalname);

  const finalPath = path.join('public', 'uploads', 'images', 'posts', originalname, originalname);

  const upload = new Upload({
    path: `${originalname}/${originalname}`
  });

  await jimp.read(imagePath).then(image => {
    image.cover(560, 320).writeAsync(finalPath);
  });

  await upload.save();

  await fs.readdir(destination)
    .then(data => {
      data.forEach(el => {
        fs.remove(path.join(destination, el)).catch(err => console.error(err));
      });
    })
    .catch(err => console.error(err));
    
  res.json({upload});
});

router.post('/init-post', async (req, res) => {
  const { id } = req.body;

  const post = new Post({
    user: '5c7928b5ba9c314da4250566',
    link: id
  });
  await post.save();
  res.json(post);
});

module.exports = router;
