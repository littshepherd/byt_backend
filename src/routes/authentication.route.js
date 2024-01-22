const {sign_up, login, authentication} = require('../controllers/user.controller')
module.exports = function(router){

    router.post('/signUp', sign_up)
    router.post('/login', login)
    // router.get('/hola', authentication, (req,res)=>{
    //     res.status(200).send({
    //         message: 'hola'
    //     })
    // } )
    return router
}