/**
 *  This file will contain the routing logic for the Category controller
 * 
*/

const { requestValidator, authJwt} = require("../middlewares");

const categoryController = require("../controllers/category.controller")

module.exports = function(app) {

    // Route for the POST request to create a category
    app.post("/ecomm/api/v1/categories", [requestValidator.validateCategoryRequest, authJwt.verifyToken, authJwt.isAdmin] , categoryController.create);

    //Route for the GET request to fetch all the categories
    app.get("/ecomm/api/v1/categories", categoryController.findAll);

    //Route for the GET request to fetch a category based on category id
    app.get("/ecomm/api/v1/categories/:id", categoryController.findOne);

    //Route for the PUT request to update a category based on id
    app.put("/ecomm/api/v1/categories/:id", [requestValidator.validateCategoryRequest, authJwt.verifyToken, authJwt.isAdmin] ,categoryController.update);

    //Route for the DELETE request to delete a category based on the id
    app.delete("/ecomm/api/v1/categories/:id", [authJwt.verifyToken, authJwt.isAdmin] ,categoryController.delete);
}