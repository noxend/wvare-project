const Post = require('../models/Post');
const User = require('../models/User');

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
    .populate({ path: 'imageHeader', select: 'path' })
    .sort({ createdAt: -1 });

  res.status(200).json({ data });
};

const getById = async (req, res) => {
  const result = await Post.findById(req.params.id)
    .populate('imageHeader')
    .populate('user');

  res.json({ msg: 'ok', id: req.params.id, result });
};

// PUT LIKE
const putLike = async (req, res) => {
  const { id } = req.params;
  const { data: userId } = req.body;

  const isLike = await Post.find({ _id: id, likes: userId });

  if (isLike.length !== 1) {
    await Post.findByIdAndUpdate(id, { $push: { likes: userId } });
    const result = await Post.findById(id).populate({
      path: 'likes',
      populate: { path: 'imageSrc' }
    });
    res.json({ whoLiked: result.likes });
  } else {
    await Post.findByIdAndUpdate(id, { $pull: { likes: userId } });
    const result = await Post.findById(id).populate({
      path: 'likes',
      populate: { path: 'imageSrc' }
    });
    res.json({ whoLiked: result.likes });
  }
};

// GET USER'S POSTS
const getUsersPosts = async (req, res) => {
  const { id: username } = req.params;
  try {
    const { _id } = await User.findOne({ login: username });
    const result = await Post.find({ user: _id, status: 'published' })
      .populate('imageHeader')
      .populate({
        path: 'user',
        populate: { path: 'imageSrc' }
      })
      .populate({
        path: 'likes',
        populate: { path: 'imageSrc' }
      })
      .sort({ createdAt: -1 });

    res.json({ result });
  } catch (err) {
    res.json({ err });
  }
};

const remove = (req, res) => {
  res.json({ msg: 'DELETE' });
};
const update = async (req, res) => {};

module.exports = {
  create,
  getAll,
  getById,
  remove,
  update,
  getUsersPosts,
  putLike
};
