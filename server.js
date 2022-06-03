const expresss = require('express');
const serverConfig = require('./configs/server.config');
const bodyParser = require('body-parser');

//intialising express
const app = expresss();

/**
 * Using the body parser middleware
 * 
 * Used for parsing the request
 * Parsing the request of the type json and convert that to object
 * 
*/
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/**
 * Initialising the database
*/
const db = require("./models");
const Category = db.category;

db.sequelize.sync({force: true})
.then(() => {
    console.log('tables dropped and created');
    init();
})

function init() {
    var categories = [
        {
            name: "Electronics",
            description: "This category will contain all the electronic products"
        }, 
        {
            name: "KitchenItems",
            description: "This category will contain all the kitchen products"
        }];

        Category.bulkCreate(categories)
        .then(() => {
            console.log("Category table initialised");
        })
        .catch(err => {
            console.log("Error while initialising categories table");
        })
}

require('./routes/category.routes')(app)


app.listen(serverConfig.PORT, () => {
    console.log(`Application started on the port no : ${serverConfig.PORT}`)
})