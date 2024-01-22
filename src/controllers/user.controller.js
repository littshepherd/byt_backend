const User = require('../models/index').User 
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');

async function sign_up(req, res){
    console.log('oe')
    const salt_rounds = 10
    const plain_text = 'mipassword'
    console.log(req.body)
try{

    const hashed_password = await bcrypt.hash(req.body.password,salt_rounds)
    const body = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        document: req.body.document,
        password: hashed_password,
        email: req.body.email
    }

    const created = await User.create(body)
    res.status(200).send(created)
}catch(e){
    res.status(400).send(e.message)
}

}
async function login(req, res){
    try{

        const user_found = await User.findOne({where: {email: req.body.email}})
        console.log(user_found)
        if(!user_found){
             res.status(200).send({
                message: "User not found"
            })
            return
        }
        const password_match = await bcrypt.compare(req.body.password, user_found.password)
        if(!password_match){
            res.status(200).send({
               message: "Password don't match"
           })
           return
       }
       delete user_found.dataValues.password
       delete user_found.dataValues.email

       const token = jwt.sign(user_found.dataValues, 'shhhhh', {expiresIn: '1m'});
       const refreshToken = jwt.sign({ user: user_found.dataValues }, 'shhhhh', { expiresIn: '1d' });
       res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' }).header('Autorization', token).send(user_found)
    }catch(e){
        res.status(400).send(e.message)
    } 
}

async function authentication(req, res, next){
    const accessToken = req.headers['authorization'];
    const refreshToken = req.cookies['refreshToken'];
    if (!accessToken && !refreshToken) {
        return res.status(401).send('Access Denied. No token provided.');
      }

      try{
        const decoded = jwt.verify(accessToken, 'shhhhh')
        console.log(decoded)
        req.user = decoded.user
        next()
      }catch(e){
        if(!refreshToken){
            return res.status(401).send('Access Denied. No refresh token provided.');
        }
        try{
            const decoded = jwt.verify(refreshToken, 'shhhhh');
            const accessToken = jwt.sign( decoded.user , 'shhhhh', { expiresIn: '1h' });
            res
            .cookie('refreshToken', refreshToken)
            .header('Authorization', accessToken)
            .send(decoded.user);
        }catch(e){
            return res.status(400).send('Invalid Token.');
        }
      }
}

module.exports = {
    sign_up,
    login,
    authentication
}