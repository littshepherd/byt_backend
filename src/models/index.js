const Sequelize = require('sequelize')

const dbName = 'byt_development'   
const dbUser = 'smooth'
const dbPassword = 'beherit77'


const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: 'localhost',
    port: '5432',
    dialect: 'postgres'
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.User = require('./User.model')(sequelize, Sequelize)
db.Role = require('./Role.model')(sequelize, Sequelize)
db.Movements = require('./movements.model')(sequelize, Sequelize)

//association
// db.Role.hasOne(db.User)
// db.User.belongsTo(db.Role, {foreignKey: 'role_id'})

db.User.hasMany(db.Movements , {
    foreignKey: {
      name: 'user_id'
    }})
db.Movements.belongsTo(db.User, {
    foreignKey: {
      name: 'user_id'
    }})
module.exports = db; 