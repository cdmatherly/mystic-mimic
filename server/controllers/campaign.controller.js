const { Campaign } = require("../models/campaign.model")
const { Character } = require("../models/character.model")

// get all campaigns and populate characters with character documents from character model
module.exports.getAllCampaigns = (req, res) => {
    Campaign.find().populate('characters').populate('owner')
        .then((campaigns) => {
            return res.json(campaigns)
        })
        .catch((err) => {
            return res.status(400).json(err)
        })
}

// get campaign by ID and populate characters with character documents from character model
module.exports.getCampaignById = (req, res) => {
    Campaign.findById(req.params.id).populate('characters')
        .then((campaign) => {
            return res.json(campaign)
        })
        .catch((err) => {
            return res.status(400).json(err)
        })
}

// Create a new campaign
module.exports.createCampaign = (req, res) => {
    Campaign.create(req.body)
        .then(campaign => {
            return res.json(campaign)
        })
        .catch((err) => {
            return res.status(400).json(err)
        })
}

// Create a new campaign and assign owner
module.exports.createCampaignAndAssignOwner = (req, res) => {
    let newCampaign = {...req.body, owner: req.params.user_id}
    Campaign.create(newCampaign)
        .then(campaign => {
            return res.json(campaign)
        })
        .catch((err) => {
            return res.status(400).json(err)
        })
}

// Edit a campaign
module.exports.updateCampaignById = (req, res) => {
    Campaign.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true })
        .then((campaign) => {
            return res.json(campaign)
        })
        .catch((err) => {
            return res.status(400).json(err)
        })
}

// Delete a campaign
module.exports.deleteCampaign = (req, res) => {
    Campaign.findByIdAndDelete(req.params.id)
        .then((campaign) => {
            return res.json(campaign)
        })
        .catch((err) => {
            return res.status(400).json(err)
        })
}

// Delete a campaign, remove deleted campaign from all characters
module.exports.deleteCampaignAndRemoveFromCharacters = (req, res) => {
    Campaign.findByIdAndDelete(req.params.campaign_id)
        .then((campaign) => {
            Character.updateMany({campaign: req.params.campaign_id},{$set: {campaign: null}})
            // Character.find({campaign: req.params.campaign_id})
                .then((characters)=>{
                    return res.json(characters)
                })
            // return res.json(campaign)
        })
        .catch((err) => {
            return res.status(400).json(err)
        })
}