const { Character } = require("../models/character.model")
const { User } = require("../models/user.model")

// Find One Character by ID
module.exports.getCharacterById = (req, res) => {
    Character.findOne({ _id: req.params.id })
        .then(character => {
            res.json(character)
        })
        .catch((err) => {
            return res.status(400).json(err)
        })
}

// Showing all Available Characters
module.exports.getAllCharacters = (req, res) => {
    Character.findById(req.params.id)
        .then((character) => {
            return res.json(character)
        })
        .catch((error) => {
            return res.status(400).json(err)
        })
}

// Create a new character
module.exports.createCharacter = (req, res) => {
    Character.create(req.body)
        .then(character => {
            console.log("Running query to create a new character:", character)
            return res.json(character)
        })
        .catch((err) => {
            return res.status(400).json(err)
        })
}

// Create a new character and update characters in given user document
module.exports.createCharacterAndUpdateUser = (req, res) => {
    Character.create(req.body)
        .then((character) => {
            console.log(req.params.user)
            console.log(character._id)
            User.findById(req.params.user)
                .then((user) => {
                    console.log(user.characters)
                    let updateCharacters = { "characters": [...user.characters, character._id]}
                    console.log(updateCharacters)
                    User.findByIdAndUpdate(req.params.user, updateCharacters, { runValidators: true, new: true })
                        .catch((error) => {
                            return res.status(400).json({ ...error, message: error.message })
                        })
                })
                .catch((error) => {
                    return res.status(400).json({ ...error, message: error.message })
                })
            return res.json(character);
        })
        .catch((error) => {
            return res.status(400).json({ ...error, message: error.message })
        });
}

// Edit a Character
module.exports.updateCharacterById = (req, res) => {
    Character.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true })
        .then((character) => {
            return res.json(character)
        })
        .catch((err) => {
            return res.status(400).json(err)
        })
}

// Delete A Character
module.exports.deleteCharacter = (req, res) => {
    Character.findByIdAndDelete(req.params.id)
        .then((character) => {
            return res.json(character)
        })
        .catch((err) => {
            return res.status(400).json(err)
        })
}