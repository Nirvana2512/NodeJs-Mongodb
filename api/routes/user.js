let express = require('express');
const router = express.Router();

const {
    register
} = require('../controllers/user')

const userRoute = (expressApp) => {
    router.post('/', register);
    expressApp.use('/api/user', router);
}

module.exports = userRoute;