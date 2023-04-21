const {
    handleCreateUser,
    handleGetAllUsers,
    handleGetUserById,
    handleDeleteUserById,
    handleUpdateUserById
}
= require('../controllers/users.controller')

module.exports = (app) => {
    app.post('/api/users', handleCreateUser)
    app.get('/api/users', handleGetAllUsers)
    app.get('/api/users/:id', handleGetUserById)
    app.delete('/api/users/:id', handleDeleteUserById)
    app.put('/api/users/:id', handleUpdateUserById)
}