const Order = require("../../../models/order");

orderController = () => {
    return {
        async index(req, res) {
            await Order.find({ status: { $ne: "completed" } }, null, {
                sort: { "createdAt": -1 }
            }).populate("customerId", "-password").exec((err, orders) => {
                if (req.xhr) return res.json(orders);
                return res.render("admin/orders");
            })
        }
    }
}
module.exports = orderController;