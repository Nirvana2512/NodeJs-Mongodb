let express = require('express');
const router = express.Router();

const {
    register,
    get
} = require('../controllers/user')

const userRoute = (expressApp) => {
    router.post('/', register);
    router.post('/login', login);
    router.get('/:id', get);
    expressApp.use('/api/user', router);
}

module.exports = userRoute;
