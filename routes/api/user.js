const express = require('express');
const passport = require('passport');
const upload = require('../../utils/fileUploader');
const router = express.Router();

const {
  getAll,
  getById,
  create,
  update,
  remove,
  getUserByUsername,
  uploadImageHeader,
  uploadUserImage,
  userRelations,
  getFriends
} = require('../../controllers/user');

router.post('/', create);

router.post('/upload-image-header', passport.authenticate('jwt', { session: false }), upload.single('file'), uploadImageHeader);
router.post('/upload-user-image', passport.authenticate('jwt', { session: false }), upload.single('file'), uploadUserImage);
router.post('/user-relations', userRelations);

router.get('/user-friends/:username', getFriends);
router.get('/', getAll);
router.get('/:id', getById);

router.get('/by-username/:username', getUserByUsername);

router.delete('/:id', remove);
router.put('/:id', update);

module.exports = router;
