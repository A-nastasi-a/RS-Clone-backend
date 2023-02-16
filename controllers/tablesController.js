const User = require('../models/User');
const Table = require('../models/Table');
const validator = require('express-validator');


class tableController {
    async createTable(request, response) {
        try {
            const errors = validator.validationResult(request);
            if (!errors.isEmpty()) {
                return response.status(401).json({message: "Wrong credentials", errors})
            }
            const { name, description, cards, date, imageURL, creator, members, columns } = request.body;
            const table = new Table({ name, description, cards, date, imageURL, creator, members, columns });
            const userCreator = await User.findById(creator);
            userCreator.tables.push(table.id);
            userCreator.save();
            table.save();
            return response.status(201).json({message: "Table created successfully"});
        }
        catch (e) {
            return response.status(404).json({message: "Wrong data"}); 
        }
    }

    async deleteTable(request, response) {
        try {
            const table = await Table.findById(request.params.id);
            if (!table) {
                return response.status(404).json({message: "Not found"});
            };
            const userCreator = await User.findById(table.creator);
            await userCreator.tables.splice(userCreator.tables.indexOf(table.id), 1);
            userCreator.save();
            table.delete();
            return response.status(200).json('Successfully delete');
        }
        catch (e) {
            return response.status(404).json({message: "Not found"});
        }
    }

    async changeTable(request, response) {
        try {
            let table = await Table.findById(request.params.id);
            if (!table) {
                return response.status(404).json({message: "This table doesn't exist"});
            };
            
            const { name, description, cards, date, imageURL, creator, members, columns } = request.body;
            Table.findByIdAndUpdate(request.params.id, { name, description, cards, date, imageURL, creator, members, columns }, () => {});
            return response.status(201).json({message: "Table was successfully changed"});
        }
        catch (e) {
            return response.status(404).json({message: "Wrong data"}); 
        }
        
    }

    async getTable(request, response) {
        try {
            const table = await Table.findById(request.params.id);
            if (!table) {
                return response.status(404).json({message: "Not found"});
            }
            return response.status(200).json(table);
        }
        catch (e) {
            return response.status(404).json({message: "Not found"});
        }
    }

    async getTables(request, response) {
        try {
            const tables = await Table.find();
            return response.status(200).json(tables);
        }
        catch (e) {
            return response.status(404).json({message: "Not found"}); 
        }
    }
}

module.exports = new tableController();