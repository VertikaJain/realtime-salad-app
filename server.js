const express = require("express");
const app = express(); //create express object
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts");
const path = require("path");

const PORT = process.env.PORT || 3000;

// Assets
app.use(express.static('public'));

// Set template engine
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => { //root path
    res.render("home"); //home.ejs in resources/views folder
})

app.get('/cart', (req, res) => {
    res.render("customers/cart");
})

app.get('/login', (req, res) => {
    res.render("auth/login");
})

app.get('/register', (req, res) => {
    res.render("auth/register");
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})