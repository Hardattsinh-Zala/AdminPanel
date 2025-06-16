const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

//hashing password
userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) {
        next();
    }
    try {
        this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
        next(error);
    }
});

//json web token -payload, header, signature
userSchema.methods.generateToken = async function() {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
        },
        process.env.JWT,
    )
    } catch (error) {
        console.error(error);
    }
}

//comparing password for user login
userSchema.methods.comparePass = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        console.error(error);
        return false;
    }
}

const User = new mongoose.model("User", userSchema);

module.exports = User;