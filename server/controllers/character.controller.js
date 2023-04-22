const { Character } = require("../controllers/user.controller")

// Find a Singlar Character
module.exports.FindOneCharacter = (request, response) => {
    Character.findOne({ _id: request.params.id })
        .then(singleCharacter => {
            response.json(singleCharacter)
        })
        .catch((error) => {
            return response.status(400).json({ message: `Finding ${singleCharacter} Character went wrong`, error: error })
        })
}

// Showing all Available Character
module.exports.ShowAllCharacter = (request, response) => {
    Character.find()
        .then((findAllCharacters) => {
            return response.json(findAllCharacters)
        })
        .catch((error) => {
            return response.status(400).json({ message: 'Error happened when showing all Characters', error: error })
        })
}

// Creating a New Character 
module.exports.CreateCharacter = (request, response) => {
    Character.create(request.body)
        .then(newCharacter => {
            console.log("Running query to create a new character:", newCharacter)
            return response.json(newCharacter)
        })
        .catch((error) => {
            return response.status(400).json({ message: 'Creating Character went wrong', error: error })
        })
}

// Edit a Character
module.exports.EditCharacter = (request, response) => {
    Character.findOneAndUpdate(
        {_id:request.params.id},
        request.body,
        {new:true, runValidators:true}
        )
        .then(updatedCharacter => {
            return response.json({character: updatedCharacter})
        })
        .catch((error) => {
            return response.status(400).json({ message: 'Editing a Character went wrong', error: error })
        })
}

// Delete A Character
module.exports.DeleteCharacter = (request, response) => {
    Character.deleteOne({_id:request.params.id})
        .then( character => {
            return response.json(character)
        })
        .catch((error) => {
            return response.status(400).json({ message: 'Deleting the Character went wrong', error: error })
        })
}