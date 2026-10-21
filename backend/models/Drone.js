const {DataTypes, STRING} = require('sequelize')

const db = require('../db/conn')

const Drone = db.define('drone',{
    codDrone: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    modelo: {
        type:DataTypes.STRING(50),
        allowNull: false
    },
    marca: {
        type:DataTypes.STRING(50),
        allowNull: false
    },
    numeroSerie: {
        type:DataTypes.INTEGER,
        allowNull: false
    },
    tipo: {
        type:DataTypes.STRING(50),
        allowNull: false
    },
    idCliente : {
        type:DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'clientes',
            key: 'codCliente'
        }
    }
},{
    timestamps: false,
    tableName: 'drones'
})

module.exports = Drone