// importing Express
const express = require('express');

const path = require('path');

// requring the database

const db = require('./config/mongoose');

// Accessing the contact Schema

const contact = require('./models/contact');

// initializing app as express
const app = express();

// Setting the view engine for rendering
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));



// Contact list
var contactList = [
    {
        name: "Iron Man",
        phoneNo: '8912345670',
    },
    {
        name: "Black Widow",
        phoneNo: '9988002233'
    },
    {
        name: "Cpt. America",
        phoneNo: '8912359670',
    },
    {
        name: "Thor",
        phoneNo: '9988102233'
    },
    {
        name: "Hawk Eye",
        phoneNo: '8912329670',
    },
    {
        name: "Hulk",
        phoneNo: '9977002233'
    },
]


// setting up the '/' request
app.get('/', (req, res) => {

    contact.find({}, (err, contacts) => {
        if (err) {
            console.log("Error in fetching contact fomr DB");
            return;
        }

        return res.render('home', {
            title: "Contact List",
            contact_List: contacts
        });
    })

    // return res.render('home', {
    //     title: "Contact List",
    //     contact_List: contactList
    // });
})

app.get("/practice", (req, res) => {
    return res.render('practice', {
        title: "Playground",
    });
})

// adding the contact in the list
app.post('/create-contact', (req, res) => {
    console.log(req.body.phone);
    // appending in the contactlist

    // contactList.push({
    //     name : req.body.name,
    //     phoneNo : req.body.phone
    // })

    contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, (err, newContact) => {
        if (err) {
            console.log("Error in creating a contact");
            return;
        }

        console.log(newContact);

        return res.redirect("/");

    })
});

app.get('/delete-contact/', (req, res) => {

    // get the query form the url
    let id = req.query.id;
    // find the contact in BD using ID and delete it
    contact.findByIdAndDelete(id, (err) => {
        if (err) {
            console.log("Error in Deleting Object from database");
        }

        // redirect to home page
        return res.redirect('back');
    })

});


const port = 8000;

app.listen(port, (err) => {
    if (err) {
        console.log('Server have an error in running : ' + err);
        return;
    }

    console.log("Server is up at : " + `http://127.0.0.1:${port}`);
})