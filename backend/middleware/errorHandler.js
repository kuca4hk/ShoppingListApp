const constants = require("../config/constants");

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    console.log(req.url + " " + statusCode);

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            return res.json({
                title: "Validation Failed",
                message: err.message,
                stackTrace: err.stack,
            });
        case constants.NOT_FOUND:
            return res.json({
                title: "Not Found",
                message: err.message,
                stackTrace: err.stack,
            });
        case constants.UNAUTHORIZED:
            return res.json({
                title: "Unauthorized",
                message: err.message,
                stackTrace: err.stack,
            });
        case constants.FORBIDDEN:
            return res.json({
                title: "Forbidden",
                message: err.message,
                stackTrace: err.stack,
            });
        case constants.SERVER_ERROR:
        default:
            return res.status(500).json({
                title: "Server Error",
                message: err.message,
                stackTrace: err.stack,
            });
    }
};

module.exports = errorHandler;
module.exports = {
    VALIDATION_ERROR: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
};