const User = require('../models/user');

module.exports.register = async (req, res) => {
    try {
        const user ={
            name: req.body.name,
            username: req.body.username
        }
        const userData = await User.create(user);
        res.json(
            {
                message: 'successful',
                playload: userData
            }
        );
       
    } catch(e){
        console.log(e);
        res.json(e);
    }
}