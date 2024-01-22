// create_table "ahorro_seguridad_socials", force: :cascade do |t|
// t.decimal "valor"
// t.text "comentario"
// t.bigint "accion_id", null: false
// t.bigint "user_id", null: false
// t.datetime "created_at", null: false
// t.datetime "updated_at", null: false
// t.index ["accion_id"], name: "index_ahorro_seguridad_socials_on_accion_id"
// t.index ["user_id"], name: "index_ahorro_seguridad_socials_on_user_id"
// end

module.exports = (sequelize, Sequelize) =>{
    const DataTypes = Sequelize.DataTypes
    const movements = sequelize.define('movements', {
        value: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: true
        },
        movement_type: {
            type: DataTypes.STRING,
            validate: {
                isIn: [['ahorro', 'retiro', 'pago', 'reposición']]
            }
        },
        section: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [['insurance', 'capital', 'IVA']]
            }
        }
        
    })
    return movements
}