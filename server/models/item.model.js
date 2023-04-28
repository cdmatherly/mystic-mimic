const mongoose = require("mongoose")

const ItemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, "Item name is required"]
        },
        weight: {
            type: Number
        },
        cost: {
            type: String
        },
        description: {
            type: String
        },
        equipment_category: {
            type:String
        },
        gear_category: {
            type:String
        },
        weapon_category: {
            type:String
        },
        weapon_range: {
            type:String
        },
        damage: {
            damage_dice: {type:String},
            damage_type: {type:String}
        },
        tool_category: {
            type:String
        },
        rarity: {
            type:String
        }
    },
    { timestamps: true }
)

module.exports.Item = mongoose.model("Item", ItemSchema)