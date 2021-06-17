const User = require('../models/user');
const bcrypt = require('bcrypt');


createHash = (password) => {
    return new Promise((resolved, reject) => {
        try {
            bcrypt.hash(password, 10, (err, hash) => {
                if (hash) {
                    resolved(hash);
                }
                reject(err);

            });
        } catch (e) {
            console.log(e);
            reject(err);
        }
    })
}
verifyPassword = (newPassword, hash) => {
    return new Promise((resolved, reject) => {
        try {
            bcrypt.compare(newPassword, hash, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolved(result);

            });
        } catch (e) {
            console.log(e);
            reject(err);
        }
    })
}

module.exports.register = async (req, res) => {
    try {
        const password = await createHash(req.body.password);
        console.log('password', password);
        const user = {
            name: req.body.name,
            username: req.body.username,
            password: password
        }
        const userData = await User.create(user);
        console.log('userData', userData);
        delete userData._doc.password;
        res.json(
            {
                message: 'successful',
                playload: userData
            }
        );    
    } catch (e) {
                console.log(e);
                res.json({
                    error: e.message
                });
            }
        }
 module.exports.login = async (req, res) => {
        try {
                const userData = await User.findOne(req.body.username);
                if(!userData){
                    res.json(
                        {
                            message: 'Invalid Cridentials',
                        }
                    );
                }
                const isPasswordMatched = await verifyPassword(req.body.password, userData.password);
                delete userData._doc.password;

                if(isPasswordMatched) {
                    res.json(
                        {
                            message: 'successful',
                            playload: userData
                        }
                    );
            } else {
                res.json(
                    {
                        message: 'Invalid Cridentials',
                    }
                );
            }
        } catch (e) {
                console.log(e);
                res.json({
                    error: e.message
                });
            }
        }

 module.exports.get = async (req, res) => {
            try {
                const userData = await User.findById(req.params.id);
                res.json(
                    {
                        message: 'successful',
                        playload: userData
                    }
                );
            } catch (e) {
                console.log(e);
                res.json({
                    error: e.message
                });
            }
}
