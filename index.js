/*
    ==================
    Title: index.js, 
    Author: William Austin
    Date: 04/08/2023
    Description: The Background on our Pets-R-Us site. Establishing a server and telling Node what to use and how to use it
*/


//Here are the Modules we are using
const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const pino = require('pino');


const mongoose = require('mongoose');
const CONN = 'mongodb+srv://waustin37:wa16171617@cluster0.hkbvlmn.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(CONN).then(() => {
    console.log('Connection to the database was successful');
}).catch(err => {
    console.log('MongoDB Error: ' + err.message);
});


//Importing our Customer Schema 
const Customer = require('./models/customer');

//Allows us to use Express 
const app = express();

//The server to use to find the site
const PORT = process.env.PORT || 3000;

//Tells the router where to look for things, here it says to use EJS to create Views and that the files will be in the Views Folder
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(expressLayouts)
app.set('layout', './layouts/layout')



//Routes

//If server receives <petsrus/> or <petsrus/index> they will be routed to the landing page
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Pets-R-Us Home', 
        message: 'Welcome to Pets-R-Us!'
    })
});
app.get('/index', (req, res) => {
    res.render('index', {
        title: 'Pets-R-Us Home', 
        message: 'Welcome to Pets-R-Us!'
    })
});

//If server receives <petsrus/groomiing> they will be routed to the grooming page
app.get('/grooming', (req, res) => {
    res.render('grooming', {
        title: 'Pets-R-Us Grooming',
        message: 'Grooming Appointments'
    })
})

//If server receives <petsrus/training> they will be routed to the training page
app.get('/training', (req, res) => {
    res.render('training', {
        title: 'Pets-R-Us Training',
        message: 'Training Appointments'
    })
})

//If server receives <petsrus/boarding> they will be routed to the training page
app.get('/boarding', (req, res) => {
    res.render('boarding', {
        title: 'Pets-R-Us Boarding',
        message: 'Boarding Appointments'
    })
})

//If server receives <petsrus/registration> they will be routed to the registration page
app.get('/registration', (req, res) => {
    res.render('registration', {
        title: 'Pets-R-Us Registration',
        message: 'User Registration'
    })
})

app.post('/register', (req, res, next) => {
    const customerId = req.body.customerId;
    const email = req.body.email;
    const newCustomer = new Customer({
        customerId,
        email
    })

    console.log(newCustomer);

    Customer.create(newCustomer, function(err, cus) {
        if (err) {
            console.log(err);
            next(err);
        } else {
            res.render('index', {
                title: 'Welcome to Pets-R-Us!'
            })
        }
    })
})






//Listening to the PORT server we established earlier
app.listen(PORT, () => {
    console.log('Application started and listening on PORT ' + PORT);
});
