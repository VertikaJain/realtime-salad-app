const User = require("../../models/user");
const bcrpyt = require("bcrypt");
const passport = require("passport");

authController = () => {
    return {
        login(req, res) {
            res.render("auth/login");
        },
        postLogin(req, res, next) {
            passport.authenticate("local", (err, user, info) => { // returns a method that has to be called.
                // In case null is returned through done()
                if (err) {
                    req.flash("error", info.message);
                    return next(err);
                }
                // In case user does not exist i.e. false is returned through done()
                if (!user) {
                    req.flash("error", info.message);
                    return res.redirect("/login")
                }
                // Login
                req.logIn(user, err => {
                    if (err) {
                        req.flash("error", info.message);
                        return next(err);
                    }
                    res.redirect("/");
                })
            })(req, res, next);
        },
        register(req, res) {
            res.render("auth/register");
        },
        async postRegister(req, res) {
            const { name, email, password } = req.body;
            // Validation check
            if (!name || !email || !password) {
                req.flash("error", "All fields are required.");
                req.flash("name", name);
                req.flash("email", email);
                res.redirect("/register");
            }
            // Check if email id exists
            User.exists({ email: email }, (err, result) => {
                if (result) {
                    req.flash("error", "Email ID already exists.");
                    req.flash("name", name);
                    req.flash("email", email);
                    res.redirect("/register");
                }
            })
            // Hash Password using bcrypt package
            const hashedPassword = await bcrpyt.hash(password, 10);
            // Create User
            const user = new User({ name, email, password: hashedPassword });
            // Saving user data to MongoDB
            user.save().then(userData => {
                return res.redirect("/");
            }).catch(err => {
                req.flash("error", "Some error occurred.");
                res.redirect("/register");
            })
        }
    }
}

module.exports = authController;