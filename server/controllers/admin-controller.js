const User = require("../models/user-model");
const Contact = require("../models/contact-model");

const getUser = async (req, res, next) => {
    try {
        const users = await User.find().select({password: 0});
        res.status(200).json({users});
    } catch (error) {
        next(error);
    }
}

const deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        await User.deleteOne({_id: id});
        res.status(200).json({msg: "Deletion successfull."});
    } catch (error) {
        next(error);
    }
}
const deleteContactById = async (req, res) => {
    try {
        const id = req.params.id;
        await Contact.deleteOne({_id: id});
        res.status(200).json({msg: "Deletion successfull."});
    } catch (error) {
        next(error);
    }
}

const getUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const userData = await User.findOne({_id: id});
        res.status(200).json(userData);
    } catch (error) {
        next(error);
    }
}

const editUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const userData = req.body;
        await User.findByIdAndUpdate(id, userData);
        res.status(200).json({msg: "User updated successfully."})
    } catch (error) {
        next(error);
    }
}

const getContact = async (req, res, next) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json({contacts});
    } catch (error) {
        next(error);
    }
}

const getContactById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const contact = await Contact.findOne({_id: id});
        res.status(200).json(contact);
    } catch (error) {
        next(error);
    }
}
const editContact = async (req, res, next) => {
    try {
        const id = req.params.id;
        const contactData = req.body;
        await Contact.findByIdAndUpdate(id, contactData);
        res.status(200).json({msg: "Contact details updated."});
    } catch (error) {
        next(error);
    }
}

module.exports = {getUser, getContact, deleteUserById, deleteContactById, getUserById, editUser, getContactById, editContact};