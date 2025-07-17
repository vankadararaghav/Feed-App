import express from 'express'
import { getPosts, getPostById, createPost, getUserPosts } from '../controllers/post.js'
import auth from '../middlewares/auth.js'

const router = express.Router()

router.get('/userPosts', auth, getUserPosts)
router.get('/', auth, getPosts)
router.get('/:id', auth, getPostById)
router.post('/', auth, createPost)

export default router
