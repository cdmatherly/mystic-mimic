const { Item } = require("../models/item.model")
const { Character } = require("../models/character.model")
const { User } = require("../models/user.model")

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
    let newItem = {
        "item": "644b608fcadd3fe04f7ac769", // <= change here,hard-coded for now
        "quantity": 2 // <= change here,hard-coded for now
    }
    Character.updateOne({ _id: req.params.char_id }, { $push: { inventory: newItem } }) //$push to add, $pull to remove
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

module.exports.getItemsByCharacter = (req, res) => {
    Character.findById(req.params.char_id)
    .then((char) => {
        console.log(char)
        let charInventory = char.inventory
        let charItems = []
        for (let i=0; i<char.inventory.length; i++){
            charItems.push(char.inventory[i].item)
        }
        console.log(charItems)
        Item.find({ _id: { $in: charItems }})
            .then((items) => {
                for (let i=0; i<charInventory.length; i++)
                    for (let j=0; j<items.length; j++){
                        console.log(items[i]._id)
                        console.log(charInventory[j].item)
                        if (items[i]._id.toString()==charInventory[j].item){
                            charInventory[j].item=items[i]
                        }
                    }
                return res.json(charInventory)
            })
            .catch((err) => {
                return res.status(400).json(err)
            })
    })
    .catch((err) => {
        return res.status(400).json(err)
    })
}

