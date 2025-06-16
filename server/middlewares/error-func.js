const errorFunction = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Server Error.";
    console.log(err);
    res.status(status).json({msg: message});
}

module.exports = errorFunction;