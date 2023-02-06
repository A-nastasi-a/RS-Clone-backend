const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');
const validator = require('express-validator');
const jwt = require('jsonwebtoken');
const secret = require('../bin/keys');

const generateAccessToken = (id, roles) => {
    const payload = {
        id, 
        roles
    }
    return jwt.sign(payload, secret.secretKey, {expiresIn: "24h"})
}

class userController {
    async registration(request, response) {
        try {
            const errors = validator.validationResult(request);
            if (!errors.isEmpty()) {
                return response.status(401).json({message: "Wrong credentials", errors})
            }
            const { username, password } = request.body;
            const checkUser = await User.findOne({username});
            if (checkUser) {
                return response.status(409).json({message: "This user already exists"});    
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: "USER"});
            const user = new User({username, password: hashPassword, roles: [userRole.value]});
            await user.save();
            return response.status(201).json({message: "User successfully created"});
        }
        catch (e) {
            response.status(401).json({message: "Registration Error"});
        }
    }

    async login(request, response) {
        try {
            const {username, password} = request.body;
            const checkUser = await User.findOne({username});
            if (!checkUser) {
                return response.status(403).json({message: `User with name ${username} doesn't exist`});
            }
            const isPasswordValid = bcrypt.compareSync(password, checkUser.password);
            if (!isPasswordValid) {
                return response.status(403).json({message: 'Incorrect password'});
            }
            const token = generateAccessToken(checkUser._id, checkUser.roles);
            return response.status(200).json({token});
        }   
        catch (e) {
            response.status(403).json({message: "Login Error"});  
        }
    }

    async getUsers(request, response) {
        try {
            response.json("server work");
        }
        catch (e) {

        }
    }
}

module.exports = new userController();