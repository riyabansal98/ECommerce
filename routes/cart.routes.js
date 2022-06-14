const { authJwt } = require("../middlewares");
const cartController = require("../controllers/cart.controller")

module.exports = function(app) {

    app.post("/ecomm/api/v1/carts", [authJwt.verifyToken], cartController.create);

    app.put("/ecomm/api/v1/carts/:id", [authJwt.verifyToken], cartController.update);

    app.get("/ecomm/api/v1/carts/:cartId", [authJwt.verifyToken], cartController.getCart);
}