const {Schema, model} = require("mongoose");

const contactSchema = new Schema({
    email: {
        type: String,
        require: true,
    },
    message: {
        type: String,
        require: true
    }
})

const Contact = new model("Contact", contactSchema);

module.exports = Contact;