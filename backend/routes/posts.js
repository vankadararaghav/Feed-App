import express from 'express'
import { getPosts, getPostById, createPost, getUserPosts } from '../controllers/post.js'
import auth from '../middlewares/auth.js'

const router = express.Router()

router.get('/userPosts', auth, getUserPosts)  // More specific first
router.get('/', auth, getPosts)
router.post('/', auth, createPost)
router.get('/:id', auth, getPostById)  

export default router
