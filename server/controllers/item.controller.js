const { Item } = require("../models/item.model")
const { Character } = require("../models/character.model")

// get all items
module.exports.getAllItems = (req, res) => {
    Item.find()
        .then((items) => {
            return res.json(items)
        })
        .catch((err) => {
            return res.status(400).json(err)
        })
}

// get item by Id
module.exports.getItemById = (req, res) => {
    Item.findById(req.params.id)
        .then((item) => {
            return res.json(item)
        })
        .catch((err) => {
            return res.status(400).json(err)
        })
}

// Create a new item
module.exports.createItem = (req, res) => {
    Item.create(req.body)
        .then(item => {
            return res.json(item)
        })
        .catch((err) => {
            return res.status(400).json(err)
        })
}

module.exports.addItemToCharacterInventory = (req, res) => {
    console.log(req.params.char_id)
    // let newItem = {
    //     "_id": "644ac9511fce2053e4f7247f",
    //     "quantity": 1
    // }
    Character.updateOne({ _id: req.params.char_id }, { $push: { inventory: req.body } })
        .then((character) => {
            return res.json(character)
        })
        .catch((err) => {
            return res.status(400).json(err)
        })
}

// Edit an item
module.exports.updateItemById = (req, res) => {
    Item.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true })
        .then((item) => {
            return res.json(item)
        })
        .catch((err) => {
            return res.status(400).json(err)
        })
}

// Delete an item
module.exports.deleteItem = (req, res) => {
    Item.findByIdAndDelete(req.params.id)
        .then((item) => {
            return res.json(item)
        })
        .catch((err) => {
            return res.status(400).json(err)
        })
}

// Add a lot of items
module.exports.InsertItems = (req, res) => {
    Item.insertMany([])
        .then((items) => {
            return res.json(items)
        })
        .catch((err) => {
            return res.status(400).json(err)
        })
}
