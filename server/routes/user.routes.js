const UserController = require("../controllers/user.controller");
const { authenticate } = require("../config/jwt.config");
module.exports = (app) => {
  app.post("/api/register", UserController.register); //
  app.post("/api/login", UserController.login);
  app.post("/api/logout", UserController.logout);
  // app.get("/api/users", authenticate, UserController.getAllUsers);
  app.get("/api/users", UserController.getAllUsers)
  app.get('/api/users/:id', UserController.getUserById)
  app.delete('/api/users/:id', UserController.deleteUserById)
  app.put('/api/users/:id', UserController.updateUserById)
};
