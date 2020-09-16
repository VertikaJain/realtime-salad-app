guest = (req, res, next) => {
    // Case when user is not logged in
    if (!req.isAuthenticated()) return next();
    // Case when user is logged in
    return res.redirect("/");
}

module.exports = guest;