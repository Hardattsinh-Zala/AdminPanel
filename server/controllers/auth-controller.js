const express = require("express");
const User = require("../models/user-model.js");
const bcrypt = require("bcrypt");

const home = (req, res) => {
    try {
        res.send("This is home page.");
    } catch (error) {
        next(error);
    }
}

const register = async (req, res, next) => {
    try {
        const { username, email, phone, password } = req.body;
        const userExists = await User.findOne({ email: email });

        if (userExists) {
            res.status(400).json({ msg: "User already exists." });
        } else {
            const userCreated = await User.create({ username, email, phone, password });
            res.status(201).json({ msg: "User created successfully.", token: await userCreated.generateToken(), userId: userCreated._id.toString() });
        }

    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({email: email});

        if(userExist) {
            const validPass = await userExist.comparePass(password);
            if(validPass) {
                res.status(201).json({ msg: "User logined successfully.", token: await userExist.generateToken(), userId: userExist._id.toString() });
            }else {
                res.status(401).json({msg: "Incorrect email or password."});
            }
        }else {
            res.status(404).json({msg: "user not found."})
        }
    } catch (error) {
        next(error);
    }
}

const user = (req, res) => {
    try {
        const userData = req.user;
        res.status(200).json({userData});
    } catch (error) {
        next(error);
    }
}

module.exports = { home, register, login, user};