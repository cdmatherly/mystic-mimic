const mongoose = require("mongoose")

const CharacterSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        campaign: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Campaign',
            default: null
        }
        ,
        name: {
            type: String,
            require: [true, "Character name is required"],
            minlength: [2, "Name must be at least {MINLENGTH} characters"]
        },
        race: {
            type: String,
            require: [true, "Race is required"],
        },
        class: {
            type: String,
            require: [true, "Class is required"],
        },
        stats: {
            strength: {
                type: Number,
                default: 8
            },
            dexterity: {
                type: Number,
                default: 8
            },
            constitution: {
                type: Number,
                default: 8
            },
            wisdom: {
                type: Number,
                default: 8
            },
            intelligence: {
                type: Number,
                default: 8
            },
            charisma: {
                type: Number,
                default: 8
            }
        },
        inventory: [
            {
                item: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Item'
                },
                quantity: {
                    type: Number
                }
            }
        ]
    },
    { timestamps: true }
)

module.exports.Character = mongoose.model("Character", CharacterSchema)