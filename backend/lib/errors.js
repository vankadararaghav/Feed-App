export class BaseError extends Error {
    constructor(message, { httpStatusCode, errorCode, data } = {}) {
      super(message)
      this.message = message
      this.details = { httpStatusCode, errorCode, data }
    }
  
    get data() {
      return this.details.data
    }
  
    get httpStatusCode() {
      return this.details.httpStatusCode
    }
  
    get errorCode() {
      return this.details.errorCode
    }
  }
  
  export class ValidationError extends BaseError {
    constructor(validatorOutput, message = "Validation error", { httpStatusCode = 400, errorCode = "-999" } = {}) {
      super(message, { httpStatusCode, errorCode, data: validatorOutput })
    }
  }
  
  export class RecordNotFoundError extends BaseError {
    constructor(message = "Record not found", { httpStatusCode = 404, errorCode = "-999", data } = {}) {
      super(message, { httpStatusCode, errorCode, data })
    }
  }
  
  export class RecordAlreadyExistsError extends BaseError {
    constructor(message = "Record already exists", { httpStatusCode = 400, errorCode = "-999", data } = {}) {
      super(message, { httpStatusCode, errorCode, data })
    }
  }
  
  export class BusinessLogicError extends BaseError {
    constructor(message = "An error has occurred", { httpStatusCode = 400, errorCode = "-999", data } = {}) {
      super(message, { httpStatusCode, errorCode, data })
    }
  }
  
  export class UnauthorizedError extends BaseError {
    constructor(message = "Unauthorized", { httpStatusCode = 401, errorCode = "-999", data } = {}) {
      super(message, { httpStatusCode, errorCode, data })
    }
  }
  
  export class DuplicateCallError extends BaseError {
    constructor(message = "Blocked", { httpStatusCode = 400, errorCode = "156", data } = {}) {
      super(message, { httpStatusCode, errorCode, data })
    }
  }
  