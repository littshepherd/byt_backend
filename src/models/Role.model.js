
module.exports = (seqluelize, Sequelize ) => {
    const DataTypes = Sequelize.DataTypes
    const users = seqluelize.define('roles', {

        rol_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [['Admin', 'Assistant', 'Employee']]
            }
        }
    })
    return users;
}
