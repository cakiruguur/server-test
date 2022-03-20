const ApiError = require("../Errors/apiErrors")

module.exports = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch((err) => {
            if(err instanceof Error){
                return next(err)
            }
            return next(new ApiError(err))
        })
    }
}