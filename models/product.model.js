/**
 * This file will be used to represent the Product Schema
 * 
 * Product Fields:
 * 1. Id
 * 2. name
 * 3. description
 * 4. cost
*/


module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING
        },
        cost: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, 
    {
        tableName: 'products'
    })
    return Product;
}

