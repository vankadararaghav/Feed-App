import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import { RecordAlreadyExistsError, RecordNotFoundError, UnauthorizedError, ValidationError } from '../lib/errors.js'

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' })

export const registerUser = async (req, res, next) => {
  try {
    let { name, email, password } = req.body
    if (!name || !email || !password) throw new ValidationError(null, 'All fields are required')
    const existing = await User.findOne({ email })
    if (existing) throw new RecordAlreadyExistsError('User already registered')
    password = await bcrypt.hash(password, 12)
    const user = await User.create({ name, email, password })
    const token = generateToken(user._id)
    res.status(201).json({ token, id: user._id })
  } catch (err) {
    next(err)
  }
}

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password) throw new ValidationError(null, 'Email and password required')
    const user = await User.findOne({ email })
    if (!user) throw new RecordNotFoundError('User not found')
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw new UnauthorizedError('Invalid credentials')
    const token = generateToken(user._id)
    res.status(201).json({ token, id: user._id })
  } catch (err) {
    next(err)
  }
}
