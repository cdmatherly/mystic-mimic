const { Campaign } = require("../models/campaign.model")
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
    User.findById(req.params.user_id)
    .then((user) => {
        let userCharacters = user.characters
        Character.find({ _id: { $in: userCharacters }})
            .then((characters) => {
                console.log(characters)
                return res.json(characters)
            })
            .catch((err) => {
                return res.status(400).json(err)
            })
    })
    .catch((err) => {
        return res.status(400).json(err)
    })
}

// Get characters by user where campaign is null
module.exports.getCharactersCampaignNullByUser = (req, res) => {
    User.findById(req.params.user_id)
        .then((user) => {
            let userCharacters = user.characters
            Character.find({ _id: { $in: userCharacters }, campaign: null })
                .then((characters) => {
                    console.log(characters)
                    return res.json(characters)
                })
                .catch((err) => {
                    return res.status(400).json(err)
                })
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
    let newCharacter = {...req.body, user: req.params.user_id}
    Character.create(newCharacter)
        .then((character) => {
            console.log(character._id)
            User.findById(req.params.user_id)
                .then((user) => {
                    console.log(user.characters)
                    let updateCharacters = { "characters": [...user.characters, character._id] }
                    console.log(updateCharacters)
                    User.findByIdAndUpdate(req.params.user_id, updateCharacters, { runValidators: true, new: true })
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

module.exports.addCharacterToCampaign = (req, res) => {
    Character.findByIdAndUpdate(req.params.char_id, req.body, { runValidators: true, new: true })
        .then((character)=>{
            Campaign.updateOne({_id:req.params.campaign_id},{ $push: {characters: req.params.char_id}})
                .then((campaign)=>{
                    return res.json(campaign)
                })
                .catch((err) => {
                    return res.status(400).json(err)
                })
        })
        .catch((err) => {
            return res.status(400).json(err)
        })
}


module.exports.removeCharacterFromCampaign = (req, res) => {
    Character.findByIdAndUpdate(req.params.char_id, req.body, { runValidators: true, new: true })
        .then((character)=>{
            Campaign.updateOne({_id:req.params.campaign_id},{ $pull: {characters: req.params.char_id}})
                .then((campaign)=>{
                    return res.json(campaign)
                })
                .catch((err) => {
                    return res.status(400).json(err)
                })
        })
        .catch((err) => {
            return res.status(400).json(err)
        })
}


module.exports.addCharacterToCampaign = (req, res) => {
    Character.findByIdAndUpdate(req.params.char_id, req.body, { runValidators: true, new: true })
        .then((character)=>{
            Campaign.updateOne({_id:req.params.campaign_id},{ $push: {characters: req.params.char_id}})
                .then((campaign)=>{
                    return res.json(campaign)
                })
                .catch((err) => {
                    return res.status(400).json(err)
                })
        })
        .catch((err) => {
            return res.status(400).json(err)
        })
}


module.exports.removeCharacterFromCampaign = (req, res) => {
    Character.findByIdAndUpdate(req.params.char_id, req.body, { runValidators: true, new: true })
        .then((character)=>{
            Campaign.updateOne({_id:req.params.campaign_id},{ $pull: {characters: req.params.char_id}})
                .then((campaign)=>{
                    return res.json(campaign)
                })
                .catch((err) => {
                    return res.status(400).json(err)
                })
        })
        .catch((err) => {
            return res.status(400).json(err)
        })
}


module.exports.addCharacterToCampaign = (req, res) => {
    Character.findByIdAndUpdate(req.params.char_id, req.body, { runValidators: true, new: true })
        .then((character)=>{
            Campaign.updateOne({_id:req.params.campaign_id},{ $push: {characters: req.params.char_id}})
                .then((campaign)=>{
                    return res.json(campaign)
                })
                .catch((err) => {
                    return res.status(400).json(err)
                })
        })
        .catch((err) => {
            return res.status(400).json(err)
        })
}


module.exports.removeCharacterFromCampaign = (req, res) => {
    Character.findByIdAndUpdate(req.params.char_id, req.body, { runValidators: true, new: true })
        .then((character)=>{
            Campaign.updateOne({_id:req.params.campaign_id},{ $pull: {characters: req.params.char_id}})
                .then((campaign)=>{
                    return res.json(campaign)
                })
                .catch((err) => {
                    return res.status(400).json(err)
                })
        })
        .catch((err) => {
            return res.status(400).json(err)
        })
}


module.exports.addCharacterToCampaign = (req, res) => {
    Character.findByIdAndUpdate(req.params.char_id, req.body, { runValidators: true, new: true })
        .then((character)=>{
            Campaign.updateOne({_id:req.params.campaign_id},{ $push: {characters: req.params.char_id}})
                .then((campaign)=>{
                    return res.json(campaign)
                })
                .catch((err) => {
                    return res.status(400).json(err)
                })
        })
        .catch((err) => {
            return res.status(400).json(err)
        })
}


module.exports.removeCharacterFromCampaign = (req, res) => {
    Character.findByIdAndUpdate(req.params.char_id, req.body, { runValidators: true, new: true })
        .then((character)=>{
            Campaign.updateOne({_id:req.params.campaign_id},{ $pull: {characters: req.params.char_id}})
                .then((campaign)=>{
                    return res.json(campaign)
                })
                .catch((err) => {
                    return res.status(400).json(err)
                })
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
    Character.findByIdAndDelete(req.params.char_id)
        .then((character) => {

            // Alternate way to find and update in one step but doesn't return user data in response for some reason
            // User.updateOne( {_id:req.params.user_id},{ $pull: {characters: req.params.char_id}},{ runValidators: true, new: true })
            //     .then(user => {
            //         return res.json(user)
            //     })


            User.findById(req.params.user_id)
                .then((user) => {
                    const filteredCharacters = user.characters.filter((character) => (character.toString() !== req.params.char_id))
                    let updateCharacters = { "characters": filteredCharacters }
                    console.log(updateCharacters)
                    User.findByIdAndUpdate(req.params.user_id, updateCharacters, { runValidators: true, new: true })
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