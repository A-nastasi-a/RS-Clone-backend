const User = require('../models/User');
const Role = require('../models/Role');
const Card = require('../models/Card');
const Table = require('../models/Table');
const bcrypt = require('bcryptjs');
const validator = require('express-validator');
const jwt = require('jsonwebtoken');
const secret = require('../bin/keys');

const generateAccessToken = (id, roles) => {
    const payload = {
        id, 
        roles
    }
    return jwt.sign(payload, secret.secretKey);
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
            return response.status(201).json({message: "Succesfully created"});
        }
        catch (e) {
            return  response.status(401).json({message: "Registration Error"});
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
            return response.status(403).json({message: "Login Error"});  
        }
    }

    async deleteUser(request, response) {
        try {
            const user = await User.findById(request.params.id);
            if (!user) {
                return response.status(404).json({message: "Not found"});
            };
            for (let cardId of user.cards) {
                const card = await Card.findById(cardId);
                card.delete();
            }
            for (let tableId of user.tables) {
                const table = await Table.findById(tableId);
                table.delete();
            }
            user.delete();
            return response.status(200).json('Successfully delete');
        }
        catch (e) {
            return response.status(404).json({message: "Not found"});  
        }
    }

    async updateUser(request, response) {
        try {
            let user = await User.findById(request.params.id);
            if (!user) {
                return response.status(404).json({message: "This card doesn't exist"});
            };
            
            const { username, password, roles, name, description, tables, cards } = request.body;
            User.findByIdAndUpdate(request.params.id, { username, password, roles, name, description, tables, cards }, () => {});
            return response.status(201).json({message: "User was successfully changed"});
        }
        catch (e) {
            return response.status(404).json({message: "Not found"});  
        }
    }

    async getUser(request, response) {
        try {
            const user = await User.findById(request.params.id);
            if (!user) {
                return response.status(404).json({message: "Not found"});
            }
            return response.status(200).json(user);
        }
        catch (e) {
            return response.status(404).json({message: "Not found"});  
        }
    }

    async getUsers(request, response) {
        try {
            const users = await User.find();
            return response.status(200).json(users);
        }
        catch (e) {
            return response.status(404).json({message: "Not found"});  
        }
    }
}

module.exports = new userController();