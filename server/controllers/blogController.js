const BlogPost = require('../models/BlogPost');
const Comment = require('../models/Comment');

const getPosts = async (req, res, next) => {
  try { const posts = await BlogPost.find().populate('author', 'username'); res.json(posts); } catch (error) { next(error); }
};
const getPostById = async (req, res, next) => {
  try {
    const post = await BlogPost.findById(req.params.id).populate('author', 'username');
    if (post) {
      const comments = await Comment.find({ post: post._id }).populate('author', 'username');
      res.json({ post, comments });
    } else res.status(404).json({ message: 'Post not found' });
  } catch (error) { next(error); }
};
const createPost = async (req, res, next) => {
  try {
    const post = new BlogPost({ ...req.body, author: req.user._id });
    const createdPost = await post.save();
    res.status(201).json(createdPost);
  } catch (error) { next(error); }
};
const updatePost = async (req, res, next) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (post) {
      if (post.author.toString() !== req.user._id.toString()) return res.status(401).json({ message: 'Not authorized' });
      Object.assign(post, req.body);
      const updatedPost = await post.save();
      res.json(updatedPost);
    } else res.status(404).json({ message: 'Post not found' });
  } catch (error) { next(error); }
};
const deletePost = async (req, res, next) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (post) {
      if (post.author.toString() !== req.user._id.toString()) return res.status(401).json({ message: 'Not authorized' });
      await post.deleteOne(); res.json({ message: 'Post removed' });
    } else res.status(404).json({ message: 'Post not found' });
  } catch (error) { next(error); }
};
const createComment = async (req, res, next) => {
  try {
    const comment = new Comment({ body: req.body.body, author: req.user._id, post: req.params.postId });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) { next(error); }
};
const getComments = async (req, res, next) => {
  try { const comments = await Comment.find({ post: req.params.postId }).populate('author', 'username'); res.json(comments); } catch (error) { next(error); }
};
module.exports = { getPosts, getPostById, createPost, updatePost, deletePost, createComment, getComments };