const express = require("express");
const app = express(); //create express object
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts");
const path = require("path");

const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => { //root path
    res.render("home"); //home.ejs in resources/views folder
})

// Set template engine
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})