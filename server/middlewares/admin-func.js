const adminFunction = (req, res, next) => {
    try {
        const userData = req.user;
        if(userData.isAdmin) 
        next();
        else res.status(403).json({msg: "Unauthorized. Access denied."});
    } catch (error) {
        next(error);
    }
}

module.exports = adminFunction;