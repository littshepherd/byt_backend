
module.exports = (seqluelize, Sequelize ) => {
    const DataTypes = Sequelize.DataTypes
    const users = seqluelize.define('users', {
        document: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        full_name: {
            type: DataTypes.VIRTUAL,
            get(){
                return `${this.first_name} ${this.last_name}`;
            }
        }
    })
    return users;
}


