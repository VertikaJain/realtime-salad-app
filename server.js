require("dotenv").config(); // config will read the .env file, parse the contents, assign it to process.env
const express = require("express");
const app = express(); //create express object
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts");
const path = require("path");
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("express-flash");
const MongoDbStore = require("connect-mongo")(session);

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

// Session Store
const mongoStore = new MongoDbStore({
    mongooseConnection: connection,
    collection: "sessions"
})

// Session Config (the session library works like a middleware)
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hours
}))

app.use(flash());

// Assets
app.use(express.static('public'));
app.use(express.json());

// Global Middlewares
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
})

// Set template engine
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');

require("./routes/web")(app); //IS EQUIVALENT TO: const web = require("./routes/web"); web(app);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})