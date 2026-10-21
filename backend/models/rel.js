const Agendamento = require('./Agendamento')
const Cliente = require('./Cliente')
const Drone = require('./Drone')

Cliente.hasMany(Drone,{
    foreignKey: 'idCliente',
    as: 'droneCliente',
    onDelete: 'CASCADE'
})

Drone.belongsTo(Cliente,{
    foreignKey: 'idCliente',
    as: 'clienteDrone',
    allowNull: false
})

Cliente.hasMany(Agendamento,{
    foreignKey: 'idCliente',
    as: 'agendamentoCliente',
    onDelete: 'CASCADE'
})

Agendamento.belongsTo(Cliente,{
    foreignKey: 'idCliente',
    as: 'clienteAgendamento',
    allowNull: false
})

Drone.hasMany(Agendamento,{
    foreignKey: 'idDrone',
    as: 'agendamentoDrone',
    onDelete: 'CASCADE'
})

Agendamento.belongsTo(Drone,{
    foreignKey: 'idDrone',
    as: 'droneAgendamento',
    allowNull: false
})

module.exports = {Agendamento, Cliente, Drone}