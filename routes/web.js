const homeController = require("../app/http/controllers/homeController");
const authController = require("../app/http/controllers/authController");
const cartController = require("../app/http/controllers/customers/cartController");
const orderController = require("../app/http/controllers/customers/orderController");

// Applying middleware 'guest' to ensure that user redirects to login/register page only when logged out.
const guest = require("../app/http/middleware/guest");

// Initialize Routes
initRoutes = (app) => {
    app.get('/', homeController().index); //root path
    app.get('/cart', cartController().index);
    app.get('/login', guest, authController().login);
    app.get('/register', guest, authController().register);

    app.post('/update-cart', cartController().update);
    app.post('/minus-item-from-cart', cartController().minusItem);
    app.post('/register', authController().postRegister);
    app.post('/login', authController().postLogin);
    app.post('/logout', authController().logout);
    app.post('/orders', orderController().store);
}

module.exports = initRoutes;