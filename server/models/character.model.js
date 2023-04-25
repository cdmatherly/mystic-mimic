const mongoose = require("mongoose")

const CharacterSchema = new mongoose.Schema(
    {
        name: {
            type:String,
            require: [true, "Character name is required"],
            minlength: [2, "Name must be at least {MINLENGTH} characters"],
        },
        race: {
            type:String,
            require: [true, "Race is required"],
        },
        class: {
            type:String,
            require: [true, "Class is required"],
        },
        stats: { 
            strength:{
                type:Number,
                default:8
            },
            dexterity:{
                type:Number,
                default:8
            },
            constitution:{
                type:Number,
                default:8
            },
            wisdom:{
                type:Number,
                default:8
            },
            intelligence:{
                type:Number,
                default:8
            },
            charisma:{
                type:Number,
                default:8
            },
        },
    }, 
    { timestamps: true }
)

module.exports.Character = mongoose.model("Character", CharacterSchema)