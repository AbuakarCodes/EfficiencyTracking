class responseClass {
    constructor(message, data = [], statusCode) {
        this.message = message,
            this.data = data,
            this.statusCode = statusCode >= 200
    }
}

export { responseClass }