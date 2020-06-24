// Making the Schema

const mongoose = require('mongoose');

// modeling the schema

const contactSchema = new mongoose.Schema({
    // name field of the contact list
    name : {
        type : String,
        required: true
    },
    // phone field of he contact list
    phone : {
        type : String,
        required : true
    }
});

const Contact = mongoose.model('contact',contactSchema);

module.exports = Contact;