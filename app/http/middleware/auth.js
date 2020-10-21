auth = (req, res, next) => {
    // Case when user is logged in
    if (req.isAuthenticated()  && req.user.role === "customer") return next();
    // Case when user is not logged in, redirect to login page
    return res.redirect("/login");
}

module.exports = auth;