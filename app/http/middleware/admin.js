admin = (req, res, next) => {
    // Case when admin is logged in
    if (req.isAuthenticated() && req.user.role === "admin") return next();
    // Case when admin is not logged in
    return res.redirect("/");
}

module.exports = admin;