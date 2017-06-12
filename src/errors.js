export class ErrorClass extends Error {
  constructor(message) {
    super(message)
    this.name = this.constructor.name
    this.message = message
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = (new Error(message)).stack
    }
  }
}

export class ErrorWrongChildType extends ErrorClass {
  constructor(type, parent) {
    super(`Wrong child type ${type} in ${parent}`)
  }
}

export class ErrorUnknownChildType extends ErrorClass {
  constructor(type) {
    super(`unknown child type ${type}`)
  }
}
