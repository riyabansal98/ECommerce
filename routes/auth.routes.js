const controller = require("../controllers/auth.controller");

module.exports = function(app) {

    app.post("/ecom/api/v1/auth/signup", [] ,controller.signup);
    app.post("/ecom/api/v1/auth/signin", controller.signin);
}