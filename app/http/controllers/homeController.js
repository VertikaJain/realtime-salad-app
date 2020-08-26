homeController = () => { //factory function
    return {
        index(req, res) { //index: function(){ }
            res.render("home");
        }
    }
}

module.exports = homeController;