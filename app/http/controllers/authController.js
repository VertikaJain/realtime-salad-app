const User = require("../../models/user");
const bcrpyt = require("bcrypt");

authController = () => {
    return {
        login(req, res) {
            res.render("auth/login");
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