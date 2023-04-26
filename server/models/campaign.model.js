const mongoose = require("mongoose")

const CampaignSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, "Campaign name is required"],
            minlength: [2, "Campaign name must be at least {MINLENGTH} characters"],
        },
        owner: {type:mongoose.Schema.Types.ObjectId, ref:'User'}
        ,
        characters: [{type: mongoose.Schema.Types.ObjectId, ref: 'Character'}]
    }, 
    { timestamps: true }
)

module.exports.Campaign = mongoose.model("Campaign", CampaignSchema)