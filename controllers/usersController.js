const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');
const validator = require('express-validator');

class userController {
    async registration(request, response) {
        try {
            const errors = validator.validationResult(request);
            if (errors.length !== 0) {
                return response.status(400).json({message: "Wrong credentials", errors})
            }
            const { username, password } = request.body;
            const checkUser = await User.findOne({username});
            if (checkUser) {
                return response.status(400).json({message: "This user already exists"});    
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: "USER"});
            const user = new User({username, password: hashPassword, roles: [userRole.value]});
            await user.save();
            return response.json({message: "User successfully created"});
        }
        catch (e) {
            console.log(e);
            response.status(400).json({message: "Registration Error"});
        }
    }

    async login(request, response) {
        try {}
        catch (e) {
            console.log(e);
            response.status(400).json({message: "Login Error"});  
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