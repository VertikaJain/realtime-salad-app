const express = require("express");
const app = express(); //create express object
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts");
const path = require("path");
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");

// Database Connection
mongoose.connect('mongodb://localhost/salad', {
    useNewUrlParser: true, useCreateIndex: true,
    useUnifiedTopology: true, useFindAndModify: true
});
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Database connected.");
}).catch(err => {
    console.log("Connection failed. " + err);
})

// Assets
app.use(express.static('public'));

// Set template engine
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');

require("./routes/web")(app);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})