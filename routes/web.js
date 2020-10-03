const homeController = require("../app/http/controllers/homeController");
const authController = require("../app/http/controllers/authController");
const cartController = require("../app/http/controllers/customers/cartController");
const orderController = require("../app/http/controllers/customers/orderController");
const adminOrderController = require("../app/http/controllers/admin/orderController");

// Applying middleware 'guest' to ensure that user redirects to login/register page only when logged out.
const guest = require("../app/http/middleware/guest");
// Applying middleware 'auth' to ensure that user redirects to customer/orders page only when logged in.
const auth = require("../app/http/middleware/auth");

// Initialize Routes
initRoutes = (app) => {
    // Loading pages from Server to Client side.
    app.get('/', homeController().index); //root path
    app.get('/cart', cartController().index);
    app.get('/login', guest, authController().login);
    app.get('/register', guest, authController().register);
    app.get('/customer/orders', auth, orderController().index);
    app.get('/admin/orders', auth, adminOrderController().index);

    // Saving data from Client to Server side.
    app.post('/update-cart', cartController().update);
    app.post('/minus-item-from-cart', cartController().minusItem);
    app.post('/register', authController().postRegister);
    app.post('/login', authController().postLogin);
    app.post('/logout', authController().logout);
    app.post('/orders', auth, orderController().store);
}

module.exports = initRoutes;