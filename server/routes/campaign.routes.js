const CampaignController =require("../controllers/campaign.controller")

module.exports = app => {
    app.get('/api/campaigns', CampaignController.getAllCampaigns)
    app.get('/api/campaigns/:id', CampaignController.getCampaignById)
    app.post('/api/campaigns', CampaignController.createCampaign)
    app.put('/api/campaigns/:id', CampaignController.updateCampaignById)
    app.delete('/api/campaigns/:id', CampaignController.deleteCampaign)

    app.post('/api/:user_id/campaigns/', CampaignController.createCampaignAndAssignOwner)
}