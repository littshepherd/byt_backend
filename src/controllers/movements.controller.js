const Movements = require('../models/index').Movements 
const User = require('../models/index').User 

async function create(req, res){
    
    try{
        const created = await Movements.create(req.body)
        if(created) res.status(201).send({
            message: 'Movimiento registrado correctamente'
        })
    }catch(e){
        res.status(500).send({
            message: 'Error interno, contacte a soporte'
        })
    }
}

async function get_movements(req, res){

    try{
        const movements_found = await Movements.findAll({ where: {section: req.query.section}, offset: req.query.offset ,limit: req.query.limit, include: [
            {model: User,
                attributes: ['first_name','last_name','full_name']
            }
        ],
    })
        const sum_movements = await Movements.sum('value', {where: {section: req.query.section}})
        if(movements_found && sum_movements) res.status(201).send({
            total: sum_movements,
           movimientos: movements_found

        })
    }catch(e){
        console.log(e)
        res.status(500).send({
            message: 'Error interno, contacte a soporte'
        })
    }
}
async function get_all_movements(req, res){

    try{
        const movements_found = await Movements.findAll({ offset: req.query.offset ,limit: req.query.limit, include: [
            {model: User,
                attributes: ['first_name','last_name','full_name']
            }
        ],
    })
        const sum_movements = await Movements.sum('value')
        if(movements_found && sum_movements) res.status(201).send({
            total: sum_movements,
           movimientos: movements_found

        })
    }catch(e){
        console.log(e)
        res.status(500).send({
            message: 'Error interno, contacte a soporte'
        })
    }
}
module.exports = {
    create,
    get_movements,
    get_all_movements
}