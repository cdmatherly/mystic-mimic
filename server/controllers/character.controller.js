const { Character } = require("../models/character.model")
const { User } = require("../models/user.model")

// get all characters
module.exports.getAllCharacters = (req, res) => {
    Character.find()
        .then((characters) => {
            return res.json(characters)
        })
        .catch((err) => {
            return res.status(400).json(err)
        })
}

// get character by ID
module.exports.getCharacterById = (req, res) => {
    Character.findById(req.params.id)
        .then((character) => {
            return res.json(character)
        })
        .catch((err) => {
            return res.status(400).json(err)
        })
}

// Get characters by user
module.exports.getCharactersByUser = (req, res) => {
    User.findById(req.params.user)
        .then((user) => {
            let userCharacters = user.characters
            Character.find({ _id: { $in: userCharacters } })
                .then((characters) => {
                    console.log(characters)
                    return res.json(characters)
                })
                .catch((err) => {
                    return res.status(400).json(err)
                })
            // return res.json(user)
        })
        .catch((err) => {
            return res.status(400).json(err)
        })
}


// Create a new character
module.exports.createCharacter = (req, res) => {
    Character.create(req.body)
        .then(character => {
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
                    let updateCharacters = { "characters": [...user.characters, character._id.toString()] }
                    console.log(updateCharacters)
                    User.findByIdAndUpdate(req.params.user, updateCharacters, { runValidators: true, new: true })
                        .catch((err) => {
                            return res.status(400).json(err)
                        })
                })
                .catch((err) => {
                    return res.status(400).json(err)
                })
            return res.json(character);
        })
        .catch((err) => {
            return res.status(400).json(err)
        });
}

// Edit a character
module.exports.updateCharacterById = (req, res) => {
    Character.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true })
        .then((character) => {
            return res.json(character)
        })
        .catch((err) => {
            return res.status(400).json(err)
        })
}

// Delete a character
module.exports.deleteCharacter = (req, res) => {
    Character.findByIdAndDelete(req.params.id)
        .then((character) => {
            return res.json(character)
        })
        .catch((err) => {
            return res.status(400).json(err)
        })
}

// Delete a character and update characters in given user document
module.exports.deleteCharacterAndUpdateUser = (req, res) => {
    Character.findByIdAndDelete(req.params.id)
        .then((character) => {

            // Alternate way to find and update in one step but doesn't return user data in response for some reason
            // User.updateOne( {_id:req.params.user},{ $pull: {characters: req.params.id}},{ runValidators: true, new: true })
            //     .then(user => {
            //         return res.json(user)
            //     })
            
            User.findById(req.params.user)
                .then((user) => {
                    const filteredCharacters = user.characters.filter((character) => (character !== req.params.id))
                    let updateCharacters = { "characters": filteredCharacters }
                    User.findByIdAndUpdate(req.params.user, updateCharacters, { runValidators: true, new: true })
                        .then((user) => {
                            return res.json(user)
                        })
                        .catch((err) => {
                            return res.status(400).json(err)
                        })
                })
                .catch((err) => {
                    return res.status(400).json(err)
                })
        })
        .catch((err) => {
            return res.status(400).json(err)
        })
}