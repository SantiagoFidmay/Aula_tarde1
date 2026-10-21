const Cliente = require('../models/Cliente')

const cryptoJs = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

const login = async(req,res)=>{
    const valores = req.body

    if(!valores.email || !valores.senha){
        return res.status(400).json({message: "Campos email e senha são obrigatorios!"})
    }

    try {
        
        const cliente = await Cliente.findOne({where: {email: valores.email}})

        if(!cliente){
            return res.status(404).json({message: "Cliente não encontrado!"})
        }

        const bytes = cryptoJs.AES.decrypt(cliente.senha,CHAVE_SECRETA)
        const senha = bytes.toString(cryptoJs.enc.Utf8)

        if(valores.senha !== senha){
            return req.status(401).json({message: "Senha incorreta, não autorizado!"})
        }

        const duasHorasEmMs = 2 * 60 * 60 * 1000
        const tempoExpirar = Date.now() + duasHorasEmMs

        const payload = {
            idCliente: cliente.codCliente,
            nome: cliente.nome,
            expiraEm: tempoExpirar
        }

        const token = cryptoJs.AES.encrypt(JSON.stringify(payload),CHAVE_SECRETA).toString()

        return res.status(200).json({
            message: "Login realizado com sucesso!",
            nome: cliente.nome,
            token: token
        })

    } catch (err) {
        console.error('Erro ao realizar o login',err)
        res.status(500).json({message: "Erro ao realizar o login "})
        
    }
}

module.exports = {login}