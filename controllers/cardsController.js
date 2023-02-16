const User = require('../models/User');
const Table = require('../models/Table');
const Card = require('../models/Card');
const validator = require('express-validator');

class cardController {
    async addCard(request, response) {
        try {
            const errors = validator.validationResult(request);
            if (!errors.isEmpty()) {
                return response.status(401).json({message: "Wrong credentials", errors})
            }
            const { name, description, table, column, comments, users, creator } = request.body;
            const card = new Card({ name, description, table, column, comments, users, creator });
            const cardTable = await Table.findById(table); 
            cardTable.cards.push(card.id);
            cardTable.save();
            const cardCreator = await User.findById(creator); 
            cardCreator.cards.push(card.id);
            cardCreator.save();
            card.save();
            return response.status(201).json({message: "Card created successfully"});
        }
        catch (e) {
            return response.status(404).json({message: "Wrong data"}); 
        }
    }
    async deleteCard(request, response) {
        try {
            const card = await Card.findById(request.params.id);
            console.log(card, 'что-то странное');
            if (!card) {
                return response.status(404).json({message: "Not found"});
            };
            const cardTable = await Table.findById(card.table); 
            await cardTable.cards.splice(cardTable.cards.indexOf(card.id), 1);
            cardTable.save();
            const cardCreator = await User.findById(card.creator); 
            await cardCreator.cards.splice(cardCreator.cards.indexOf(card.id), 1);
            cardCreator.save();
            card.delete();
            return response.status(200).json('Successfully delete');
        }
        catch (e) {
            return response.status(404).json({message: "Not found"});
        }
    }
    async updateCard(request, response) {
        try {
            let card = await Card.findById(request.params.id);
            if (!card) {
                return response.status(404).json({message: "This card doesn't exist"});
            };
            
            const { name, description, table, column, comments, users, creator } = request.body;
            Card.findByIdAndUpdate(request.params.id, { name, description, table, column, comments, users, creator }, () => {});
            return response.status(201).json({message: "Card was successfully changed"});
        }
        catch (e) {
            return response.status(404).json({message: "Wrong data"}); 
        }
    }
    async getCard(request, response) {
        try {
            const card = await Card.findById(request.params.id);
            if (!card) {
                return response.status(404).json({message: "Not found"});
            }
            return response.status(200).json(card);
        }
        catch (e) {
            return response.status(404).json({message: "Not found"});
        }
    }
    async getCards(request, response) {
        try {
            const cards = await Card.find();
            return response.status(200).json(cards);
        }
        catch (e) {
            return response.status(404).json({message: "Not Found"});
        }
    }
}

module.exports = new cardController();