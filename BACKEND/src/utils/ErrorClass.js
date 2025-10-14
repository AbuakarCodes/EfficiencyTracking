class ErrorClass {
    constructor(message, statusCode) {
        this.message = message
        this.statusCode = statusCode >= 200
    }
}

export { ErrorClass }