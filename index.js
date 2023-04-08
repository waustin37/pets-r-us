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

//Allows us to use Express 
const app = express();


//Tells the router where to look for things, here it says to use EJS to create Views and that the files will be in the Views Folder
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));


//The server to use to find the site
const PORT = process.env.PORT || 3000;


//If server receives <petsrus/> or <petsrus/index> they will be routed to the landing page
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Pets-R-Us Landing', 
        message: 'Welcome to Pets-R-Us!'
    })
});
app.get('/index', (req, res) => {
    res.render('index', {
        title: 'Pets-R-Us Landing', 
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

//Listening to the PORT server we established earlier
app.listen(PORT, () => {
    console.log('Application started and listening on PORT ' + PORT);
});
