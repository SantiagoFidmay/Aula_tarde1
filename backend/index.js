const express = require('express')
const app = express()
const cors = require('cors')

const PORT = 3000
const hostname = 'localhost'

const conn = require('./db/conn')
require('./models/rel')

const authMiddleware = require('./middleware/auth.middleware')
const authController = require('./controller/auth.controller')
const agendamentoController = require('./controller/agendamento.controller')
const clienteController = require('./controller/cliente.controller')
const droneController = require('./controller/drone.controller')


// ----------- MiddleWare ----------

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

//----- Rotas Públicas -----------

app.post('/cliente',clienteController.cadastrar)
app.post('/login',authController.login)

//-------Middleware pro token--------------

app.use(authMiddleware)

//------ Rotas privadas--------------

app.get('/cliente/:id',clienteController.consultarID)
app.delete('/cliente/:id',clienteController.apagar)
app.get('/clientes',clienteController.listar)
app.put('/cliente/:id',clienteController.atualizar)

app.post('/agendamento',agendamentoController.cadastrar)
app.get('/agendamentos',agendamentoController.listar)
app.put('/agendamento/:id',agendamentoController.atualizar)

app.post('/drone',droneController.cadastrar)
app.get('/drones',droneController.listar)



app.get('/',(req,res)=>{
    res.status(200).json({message: "Aplicação rodando!"})
})

// --------- Sincronizando o servidor com o banco de dados -----

conn.sync()
    .then(()=>{
        app.listen(PORT,hostname, ()=>{
            console.log(`Servidor rodando em http://${hostname}:${PORT}`)
        })
    })
    .catch((err)=>{
        console.error('Erro ao conectar com o banco de dados!',err)

    })



