const mongoose = require("mongoose")

const ItemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, "Item name is required"]
        },
        weight: {
            type: Number
        }
        ,
        cost: {
            type: Number
        },
        description: {
            type: String
        }
    },
    { timestamps: true }
)

module.exports.Item = mongoose.model("Item", ItemSchema)