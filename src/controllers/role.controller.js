const Role = require('../models/index').Role 

async function create_role(req, res){
    const role_found = await Role.findOne({where: {role_name: req.body.role_name}})
    if (role_found) return res.status(409).send({
        message: 'Role alredy exist'
    })
    try{
        const role_created = await Role.create(req.body)
        if(role_created) res.status(201).send({
            message: 'Role has been created'
        })
    }catch(e){
        res.status(500).send({
            message: 'Internal error, contact the admin'
        })
    }
}

module.exports = {
    create_role
}