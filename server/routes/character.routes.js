const CharacterController =require("../controllers/character.controller")

module.exports = app => {
    app.get('/api/characters', CharacterController.getAllCharacters)
    app.get('/api/characters/:id', CharacterController.getCharacterById)
    app.post('/api/characters', CharacterController.createCharacter)
    app.put('/api/characters/:id', CharacterController.updateCharacterById)
    app.delete('/api/characters/:id', CharacterController.deleteCharacter)
    app.get('/api/:user/characters', CharacterController.getCharactersByUser)
    app.post('/api/:user/characters', CharacterController.createCharacterAndUpdateUser)
}