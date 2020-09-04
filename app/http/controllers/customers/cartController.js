cartController = () => {
    return {
        index(req, res) {
            res.render("customers/cart");
        },
        update(req, res) {
            // In case cart is empty
            if (!req.session.cart) {
                req.session.cart = {
                    items: {}, totalQty: 0, totalPrice: 0
                }
            }
            let cart = req.session.cart;
            if (!cart.items[req.body._id])  // if item is first.
                cart.items[req.body._id] = { item: req.body, qty: 1 };
            else // if item is already in cart
                cart.items[req.body._id].qty += 1;

            cart.totalQty += 1;
            cart.totalPrice += req.body.price;
            return res.json({
                totalQty: req.session.cart.totalQty,
                totalPrice: req.session.cart.totalPrice,
                qty: cart.items[req.body._id].qty,
                price: req.body.price
            })
        },
        minusItem(req, res) {
            let cart = req.session.cart;
            if (cart.items[req.body._id].qty > 0) {
                cart.items[req.body._id].qty -= 1;
                cart.totalQty -= 1;
                cart.totalPrice -= req.body.price;
            }
            return res.json({
                totalQty: req.session.cart.totalQty,
                totalPrice: req.session.cart.totalPrice,
                qty: cart.items[req.body._id].qty,
                price: req.body.price
            })

        }
    }
}

module.exports = cartController;