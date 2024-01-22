const {create, get_movements, get_all_movements} = require('../controllers/movements.controller')
const {authentication} = require('../controllers/user.controller')

module.exports = function(router){

    router.post('/create',authentication, create)
    router.get('/get-movements', get_movements)
    router.get('/get-all-movements', get_all_movements)

    return router
}