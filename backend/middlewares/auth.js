import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import { UnauthorizedError } from '../lib/errors.js'

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) throw new UnauthorizedError('No token provided')
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id).select('-password')
    if (!user) throw new UnauthorizedError('User not found')
    req.user = user
    next()
  } catch (err) {
    next(new UnauthorizedError('Unauthorized access'))
  }
}

export default auth
