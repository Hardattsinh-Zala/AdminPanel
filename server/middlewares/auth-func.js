const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authFunction = async (req, res, next) => {
    const data = req.header("Authorization");

    if(!data) {
        res.status(401).json({msg: "Unauthorized. Access denied."});
    }

    const token = data.replace("Bearer ", "");
    try {
        const decoded = jwt.verify(token, process.env.JWT);
        const userData = await User.findOne({email: decoded.email}).select({password: 0});
        req.user = userData;
        req.token = token;
        next();
    } catch (err) {
        const error = {
            status: 401,
            message: "Unauthorized. Access denied."
        }
        next(error);
    }
}

module.exports = authFunction;