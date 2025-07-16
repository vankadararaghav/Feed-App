import Post from '../models/post.js'
import { RecordNotFoundError, ValidationError } from '../lib/errors.js'

export const getPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit

    const [items, total] = await Promise.all([
      Post.find().sort({ createdAt: -1 }).skip(skip).limit(limit).populate('author', 'name email'),
      Post.countDocuments()
    ])

    res.json({ page, totalPages: Math.ceil(total / limit), totalItems: total, items })
  } catch (err) {
    next(err)
  }
}

export const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name email')
    if (!post) throw new RecordNotFoundError('Post not found')
    res.json(post)
  } catch (err) {
    next(err)
  }
}

export const createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body
    if (!title || !content) throw new ValidationError(null, 'Title and content required')

    const post = await Post.create({ title, content, author: req.user._id })
    res.status(201).json(post)
  } catch (err) {
    next(err)
  }
}

export const getUserPosts = async (req, res, next) => { 
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const skip = (page - 1) * limit
        const [items, total] = await Promise.all([
         Post.find({ author:req.user.id }).sort({ createdAt: -1 }).skip(skip).limit(limit).populate('author', 'name email'),
         Post.countDocuments({ author: req.user.id })
        ])
    
        res.json({ page, totalPages: Math.ceil(total / limit), totalItems: total, items })
      } catch (err) {
        next(err)
    }
}
