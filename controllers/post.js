const User = require('../models/User');
const Post = require('../models/Post');

const create = async (req, res) => {
  const {
    id,
    title,
    headerImageData: { _id },
    text
  } = req.body;

  try {
    const result = await Post.findByIdAndUpdate(id, {
      link: title,
      status: 'published',
      title: title,
      imageHeader: _id,
      text: text
    });

    res.status(201).json(result);
  } catch (err) {
    // errorHendler(res, err);
  }
};

const getAll = async (req, res) => {
  const data = await Post.find({ status: 'published' })
    .populate({ path: 'user', select: 'login' })
    .populate({ path: 'imageHeader', select: 'path' });

  res.status(200).json({ data });
};
const getById = async (req, res) => {
  const result = await Post.findById(req.params.id)
    .populate('imageHeader')
    .populate('user');

  res.json({ msg: 'ok', id: req.params.id, result });
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
  update
};
