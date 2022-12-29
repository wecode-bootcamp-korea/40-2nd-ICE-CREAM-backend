const errMessages = require('./errorMessages')

const catchAsync = func => {
	return (req, res, next) => {
		func(req, res, next).catch((error) => next({
            statusCode : errMessages[error.message]?.statusCode,
            message : errMessages[error.message]?.message
        }))
	}
}

const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "UNDEFINED_ERROR";
    res.status(err.statusCode).json({ error : true, message : err.message })
}


module.exports = { catchAsync, globalErrorHandler }