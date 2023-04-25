const CharacterController =require("../controllers/character.controller")

module.exports = app => {
    app.get('/api/characters', CharacterController.getAllCharacters)
    app.get('/api/characters/:id', CharacterController.getCharacterById)
    app.post('/api/characters', CharacterController.createCharacter)
    app.put('/api/characters/:id', CharacterController.updateCharacterById)
    app.delete('/api/characters/:id', CharacterController.deleteCharacter)

    app.get('/api/:user_id/characters', CharacterController.getCharactersByUser)
    app.get('/api/:user_id/characters/campaign_null', CharacterController.getCharactersCampaignNullByUser)
    app.post('/api/:user_id/characters', CharacterController.createCharacterAndUpdateUser)
    app.delete('/api/:user_id/characters/:char_id', CharacterController.deleteCharacterAndUpdateUser)
    app.put('/api/characters/:char_id/add/campaigns/:campaign_id', CharacterController.addCharacterToCampaign)
    app.put('/api/characters/:char_id/remove/campaigns/:campaign_id', CharacterController.removeCharacterFromCampaign)
}