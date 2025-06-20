module.exports = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({
        error: err.name,
        message: err.message || 'Internal Server Error'
    });
};