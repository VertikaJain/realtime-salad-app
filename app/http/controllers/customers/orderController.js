const Order = require("../../../models/order");
const moment = require("moment");

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
                // Remove cart once ordered
                delete req.session.cart;
                return res.redirect("/customer/orders");
            }).catch(err => {
                req.flash("error", "Something went wrong");
                return res.redirect("/cart");
            })
        },
        async index(req, res) {
            const orders = await Order.find({ customerId: req.user._id }, null,
                {
                    sort: { "createdAt": -1 } // Sorting Orders on the basis of Date in Descending order
                });
            res.render("customers/orders", { orders, moment }); //opening orders.ejs
        }
    }
}

module.exports = orderController;