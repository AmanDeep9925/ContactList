// making connection to the database

// requirng the mongoose
const mongoose = require('mongoose');

// making the connection to the database
mongoose.connect('mongodb://localhost/contact_list_DB');

const db = mongoose.connection;

// handling the error

db.on('error',console.error.bind("Error connecting to DATABASE :/"));

// handling the connection

db.once('open',() =>{
    console.log("Successfully connected to DATABASE :)");
});