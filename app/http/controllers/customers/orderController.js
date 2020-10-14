const Order = require("../../../models/order");
const moment = require("moment");

orderController = () => {
    return {
        store(req, res) {
            // Validate Request fields
            const { phone, address } = req.body;
            if (!phone || !address) {
                req.flash("error", "All fields are required.");
                req.flash("phone", phone);
                req.flash("address", address);
                return res.redirect("/cart");
            }
            if (phone.length != 10) { //Verify phone number
                req.flash("error", "Invalid phone number.");
                req.flash("phone", "");
                req.flash("address", address);
                return res.redirect("/cart");
            }
            // Store/save Orders data to orders collection in MongoDB
            new Order({
                customerId: req.user._id, items: req.session.cart.items, phone, address
            }).save().then(result => {
                req.flash("success", "Order placed successfully.");
                Order.populate(result, { path: "customerId" }, (err, data) => {
                    // Emit event For Dynamic Update on Admin page when order is successfully placed
                    const eventEmitter = req.app.get("eventEmitter");
                    eventEmitter.emit("placedOrder", data);
                    // Remove cart once ordered
                    delete req.session.cart;
                    return res.redirect("/customer/orders");
                })
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
            res.header('Cache-Control', 'no-store')
            res.render("customers/orders", { orders, moment }); //opening orders.ejs
        },
        async show(req, res) {
            const order = await Order.findById(req.params.id); // Getting ID dynamically from URL
            // Authorize user so that no other ID can be used other than actual ID
            if (req.user._id.toString() === order.customerId.toString()) {
                return res.render("customers/singleOrderTracker", { order })
            }
            return res.redirect("/");
        }
    }
}

module.exports = orderController;