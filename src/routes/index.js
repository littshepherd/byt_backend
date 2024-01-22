

const router = require('express').Router();
const authentication = require('./authentication.route') (router) ;
const movements = require('./movements.route') (router);
// const role = require('./role.route') (router) ;

function application_router(){

router.use('/auth', authentication);
router.use('/movements', movements);

return router
}

module.exports = application_router