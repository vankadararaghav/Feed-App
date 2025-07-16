import { BaseError } from '../lib/errors.js'

const errorHandler = (err, req, res, next) => {
  if (err instanceof BaseError) {
    return res.status(err.httpStatusCode || 500).json({
      message: err.message,
      errorCode: err.errorCode,
      data: err.data
    })
  }
  console.error(err)
  res.status(500).json({ message: 'Internal server error' })
}

export default errorHandler
