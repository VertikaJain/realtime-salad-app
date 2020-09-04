const homeController = require("../app/http/controllers/homeController");
const authController = require("../app/http/controllers/authController");
const cartController = require("../app/http/controllers/customers/cartController");

// Initialize Routes
initRoutes = (app) => {
    app.get('/', homeController().index); //root path
    app.get('/cart', cartController().index);
    app.get('/login', authController().login);
    app.get('/register', authController().register);

    app.post('/update-cart', cartController().update);
    app.post('/minus-item-from-cart', cartController().minusItem);
}

module.exports = initRoutes;