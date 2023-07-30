const response = (statusCode, data, message, res) => {
    // console.log(res.statusCode)
    res.status(statusCode).json({
        code : statusCode,
        message : message,
        data : data,
    })
}

module.exports = response