const mongoose = require("mongoose")

const CampaignSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, "Campaign name is required"],
            minlength: [2, "Campaign name must be at least {MINLENGTH} characters"],
        },
        characters: {
            type: Array
        }
    }, 
    { timestamps: true }
)

module.exports.Campaign = mongoose.model("Campaign", CampaignSchema)