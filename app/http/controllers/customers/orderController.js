const Order = require("../../../models/order");

orderController = () => {
    return {
        store(req, res) {
            // Validate Request fields
            const { phone, address } = req.body;
            if (!phone || !address) {
                req.flash("error", "All fields are required.");
                return res.redirect("/cart");
            }
            // Store 
            const order = new Order({
                customerId: req.user._id, items: req.session.cart.items, phone, address
            }).save().then(result => {
                req.flash("success", "Order placed successfully.");
                return res.redirect("/");
            }).catch(err => {
                req.flash("error", "Something went wrong");
                return res.redirect("/cart");
            })
        },
        async index(req, res) {
            const orders = await Order.find({ customerId: req.user._id });
            res.render("customers/orders", { orders }); //opening orders.ejs
        }
    }
}

module.exports = orderController;