const userController = require('../controllers/userController.js');
module.exports = app => {
    app.get('/api/users', userController.findAllUsers);
    app.get('/api/users/:id', userController.findOneSingleUser);
    app.post('/api/users', userController.createNewUser);
}
