import express from 'express'
import { getPosts, getPostById, createPost, getUserPosts } from '../controllers/post.js'
import auth from '../middlewares/auth.js'

const router = express.Router()

router.get('/userPosts', auth, getUserPosts)
router.get('/', getPosts)
router.get('/:id', getPostById)
router.post('/', auth, createPost)

export default router
