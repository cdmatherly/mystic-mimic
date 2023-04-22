const CharacterController =require("../controllers/character.controller")

module.export = app => {
    app.get('/api/characters', CharacterController.ShowAllCharacter)
    app.get('/api/characters/:id', CharacterController.FindOneCharacter)
    app.post('/api/characters', CharacterController.CreateCharacter)
    app.put('/api/characters/:id', CharacterController.EditCharacter)
    app.delete('/api/characters/:id', CharacterController.DeleteCharacter)
}