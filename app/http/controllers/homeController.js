const Menu = require("../../models/menu");
homeController = () => { //factory function
    return {
        async index(req, res) { //index: function(){ }
            const salads = await Menu.find();
            res.render("home", { salads }); // can be written as {salads: salads}
            /* Menu.find().then(salads => {
                res.render("home", { salads: salads });
            }) */
        }
    }
}

module.exports = homeController;