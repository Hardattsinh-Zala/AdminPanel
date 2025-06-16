const express = require("express");
const Contact = require("../models/contact-model.js");

const contact = async (req, res, next) => {
    try {
        const {email, message} = req.body;
        const data = await Contact.create({email, message});
        res.status(200).json({msg: "Form submitted successfully."})
    } catch (error) {
        next(error);
    }
}

module.exports = contact;