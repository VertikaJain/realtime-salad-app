cartController = () => {
    return {
        index(req, res) {
            res.render("customers/cart");
        },
        update(req, res) {
            // In case cart is empty
            if (req.user.role === "admin") return res.json();
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
            cart.items[req.body._id].qty -= 1;
            cart.totalQty -= 1;
            cart.totalPrice -= req.body.price;
            // Case 1: When selected item is deleted
            if (cart.items[req.body._id].qty == 0) {
                delete cart.items[req.body._id];
                // Case 2: When all items are deleted
                if (cart.totalQty == 0) {
                    delete req.session.cart;
                    delete cart;
                    return res.json();
                }
                return res.json({
                    totalQty: req.session.cart.totalQty,
                    totalPrice: req.session.cart.totalPrice,
                })
            }
            // Case 3: When selected item is reduced by 1 quantity
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