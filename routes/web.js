const homeController = require("../app/http/controllers/homeController");
const authController = require("../app/http/controllers/authController");
const cartController = require("../app/http/controllers/customers/cartController");
const orderController = require("../app/http/controllers/customers/orderController");
const adminOrderController = require("../app/http/controllers/admin/orderController");
const adminOrderStatusController = require("../app/http/controllers/admin/statusController");

// Applying middleware 'guest' to ensure that user redirects to login/register page only when logged out.
const guest = require("../app/http/middleware/guest");
// Applying middleware 'auth' to ensure that user redirects to customer/orders page only when logged in.
const auth = require("../app/http/middleware/auth");
// Applying middleware 'admin' to ensure that only the admin has access to the admin/orders page once logged in.
const admin = require("../app/http/middleware/admin");

// Initialize Routes
initRoutes = (app) => {
    // Loading pages from Server to Client side.
    app.get('/', homeController().index); //root path
    app.get('/cart', cartController().index);
    app.get('/login', guest, authController().login);
    app.get('/register', guest, authController().register);
    app.get('/customer/orders', auth, orderController().index);
    app.get('/customer/orders/:id', auth, orderController().show);
    app.get('/admin/orders', admin, adminOrderController().index);

    // Saving data from Client to Server side.
    app.post('/update-cart', cartController().update);
    app.post('/minus-item-from-cart', cartController().minusItem);
    app.post('/register', authController().postRegister);
    app.post('/login', authController().postLogin);
    app.post('/logout', authController().logout);
    app.post('/orders', auth, orderController().store);
    app.post('/admin/order/status', admin, adminOrderStatusController().update);
}

module.exports = initRoutes;