const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config");
const db = require("../models");
const User = db.user;


verifyToken = (req, res, next) => {

    let token = req.headers["x-access-token"]; //get access to the token passed by the user

    if(!token) { // if no token passed by user, throw error. 
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    //Do the verification of the token
    jwt.verify(token, config.secret, (err, decoded) => {
        if(err) {
            return res.status(401).send({
                message: "Unathorised!"
            });
        }
        console.log("decoded");
        console.log(decoded);
        req.userId = decoded.id;
        next();
    })
}

//Check whether the user who hit the API is admin or not. 
isAdmin = (req, res, next) => {

    User.findByPk(req.userId)
    .then(user => {
        console.log("Userssss")
        console.log(user);
        user.getRoles() 
        .then(roles => {
            for(let i = 0; i < roles.length; i++) {
                if(roles[i].name === "admin") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Required Admin Role"
            });
            return;
        });
    });
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin
};

module.exports = authJwt;