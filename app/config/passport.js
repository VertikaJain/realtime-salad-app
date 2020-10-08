const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const bcrypt = require("bcrypt");

init = passport => {
    passport.use(new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
        // Login
        // Check if email exists
        const user = await User.findOne({ email: email });
        if (!user) {
            return done(null, false, { message: "No user with this email." });
        }
        // Check password by comparing with DB
        bcrypt.compare(password, user.password).then(match => {
            if (match)
                return done(null, user, { message: "Logged in Successfully." });
            return done(null, false, { message: "Wrong username or password." });
        }).catch(err => {
            return done(null, false, { message: "Something went wrong." });
        })
    }))
    // Storing user data (ID) in session after successful login
    passport.serializeUser((user, done) => {
        done(null, user._id);
    })
    // GET user data from session
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, userData) => { // User.findOne({_id: id})
            done(err, userData); // will get the user data in req.user
        });
    })
}

module.exports = init;