const conn = require('./db/conn')
const {Agendamento, Cliente, Drone} = require('./models/rel')

async function syncDataBase() {
    try {
        await conn.sync({force: true})
        console.log('Tabelas criadas e sincronizadas!')
    } catch (err) {
        console.error('Erro ao criar as tabelas')

    }finally{
        await conn.close()
        console.log('Fechando conexão com o banco de dados!')

    }
    
}

syncDataBase()