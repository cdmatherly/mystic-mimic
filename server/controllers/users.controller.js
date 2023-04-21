const {Users} = require('../models/users.model')

const handleCreateUser = (req,res) => {
    Users.create(req.body)
        .then((user)=>{
            return res.json(user);
        })
        .catch((error) => {
            return res.status(400).json({ ...error, message: error.message })
        });
}

// Users.find().sort({name: 'asc'}) to sort
const handleGetAllUsers = (req, res) => {
    Users.find().sort({number: 'asc'})
        .then((users) => {
            return res.json(users)
        })
        .catch((error) => {
            return res.status(400).json({...error, message: error.message})
        })
}

const handleGetUserById = (req, res) => {
    Users.findById(req.params.id)
        .then((user) => {
            return res.json(user)
        })
        .catch((error) => {
            return res.status(400).json({...error, message: error.message})
        })
}

const handleGetUserRandom = (req, res) => {
    Users.aggregate([{ $sample: { size: 1 } }])
        .then ((user) => {
            return res.json(user)
        })
        .catch((error) => {
            return res.status(400).json({...error, message: error.message})
        })
}

const handleDeleteUserById = (req, res) => {
    Users.findByIdAndDelete(req.params.id)
        .then((user) => {
            return res.json(user)
        })
        .catch((error) => {
            return res.status(400).json({...error, message: error.message})
        })
}

const handleUpdateUserById = (req, res) => {
    Users.findByIdAndUpdate(req.params.id, req.body, {runValidators: true, new: true})
        .then ((user) => {
            return res.json(user)
        })
        .catch((error) => {
            return res.status(400).json({...error, message: error.message})
        })
}


module.exports = {
    handleCreateUser,
    handleGetAllUsers,
    handleGetUserById,
    handleDeleteUserById,
    handleUpdateUserById
}