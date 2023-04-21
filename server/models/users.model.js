const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Required field.'],
            minlength: [2, 'Name must contain {MINLENGTH} characters']
        },
        email: {
            type: String,
            required: [true, 'Required field.'],
            minlength: [5, 'Name must contain {MINLENGTH} characters']
        },
        password: {
            type: String,
            required: [true, 'Required field.'],
            minlength: [8, 'Name must contain {MINLENGTH} characters']
        },
        characters: {
            type: Number,
            required: [true, 'Required field.'],
            unique: true,
            min: [1, 'Must be a number greater than 0']
        }
    },
    { timestamps: true }
);

const Users = mongoose.model('Users', UsersSchema)

module.exports = { Users: Users }