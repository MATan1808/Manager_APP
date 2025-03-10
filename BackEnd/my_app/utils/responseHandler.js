function responseHandler(res, statusCode, message, data = null) {
    res.status(statusCode).json({
        status: statusCode === 200 ? "SUCCESS" : "FAILED",
        message,
        data,
    });
}

module.exports = responseHandler;