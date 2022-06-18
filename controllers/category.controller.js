/**
 * This file contains the controller logic for the category
 * resource. 
 * Everytime a CRUD request come for the category, methods defined
 * in this contoller file will be executed. 
*/

const db = require("../models");
const Category = db.category;

/**
 * POST: Create and save a new category
*/
exports.create = (req, res) => {

    /**
     * Creation of the category object to be stored in the db.
    */
 
    
    const category = {
        name: req.body.name,
        description: req.body.description
    };

    Category.create(category)
    .then(category => {
        console.log(`category name: [$category.name] got inserted in the DB`)
        res.status(201).send(category);
    
    })
    .catch(err => {
        console.log(`Issue in inserting category name: [${category.name}]`)
        console.log(`Error Message : ${err.message}`)
        res.status(500).send({
            message: "Some internal error while storing the category!"
        })
    })
}


/**
 * Get a list of all the categories
*/

exports.findAll = (req, res) => {

    let categoryName = req.query.name;
    let promise;
    if(categoryName) {
        promise = Category.findAll({
            where: {
                name: categoryName
            }
        });
    
    }else{
        promise = Category.findAll();
    }

    promise
    .then(categories => {
        res.status(200).send(categories);
    })
    .catch(err => {
        res.status(500).send({
            message: "Some internal error while fetching the categories"
        })
    })
}

/**
 * Get a category based on the category id
*/

exports.findOne = (req, res) => {
    const categoryId = req.params.id; 

    Category.findByPk(categoryId)
    .then(category => {

        if(!category) {
            return res.status(404).json({
                message: 'Category not found'
            })
        }
        res.status(200).send(category);
    })
    .catch(err => {
        res.status(500).send({
            message: "Some internal error while fetching the category based on id"
        })
    })
}

/**
 * Update the existing category
*/
exports.update = (req, res) => {

    const category = {
        name: req.body.name,
        description: req.body.description
    };

    const categoryId = req.params.id

    Category.update(category, {
        where: {id: categoryId}
    })
    .then(updatedCategory => {
        
        //Where the updation happened successfuly. 
        //You need to send the updated row to the table. 
        //But while fetching that row and sending it to user
        //there can be a error. 
        Category.findByPk(categoryId)
        .then(category => {
            res.status(200).send(category);
        })
        .catch(err => {
            res.status(500).send({
                message: "Some internal error while fetching the category based on id"
            })
        })
    })
    .catch(err => {
        //Where the updation task failed. 
        res.status(500).send({
            message: "Some internal error while updating the category based on id"
        })
    })
}

/**
 * Delete an existing category based on category id
*/
exports.delete = (req, res) => {
    const categoryId = req.params.id;

    Category.destroy({
        where: {
            id: categoryId
        }
    })
    .then(result => {
        res.status(200).send({
            message: "Successfully deleted the category"
        })
    })
    .catch(err => {
        res.status(500).send({
            message: "Some internal error while deleting the category based on id"
        })
    })
}