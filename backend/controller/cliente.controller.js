const Cliente = require('../models/Cliente')
const cryptoJs = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

// Crud completo

const cadastrar = async(req,res)=>{
    const valores = req.body
    
    if(!valores.nome || !valores.email || !valores.senha || !valores.cpf || !valores.celular){
        return res.status(400).json({message: "Todos os campos são obrigatórios!"})
    }

    // if(!valores.cpf.length !== 11){
    //     return res.status(400).json({message: "Cpf inválido!"})
    // }

    try {
        const senhaCripto = cryptoJs.AES.encrypt(valores.senha, CHAVE_SECRETA).toString()
        const cpfCripto = cryptoJs.AES.encrypt(valores.cpf, CHAVE_SECRETA).toString()

       await Cliente.create({
            nome: valores.nome,
            email: valores.email,
            senha: senhaCripto,
            cpf: cpfCripto,
            celular: valores.celular
       })

       res.status(201).json({message: "Cliente cadastrado com sucesso!"})


    } catch (err) {
        console.error('Erro ao cadastrar Cliente',err)
        res.status(500).json({message: "Erro ao cadastrar Cliente "})
        
    }
}

const consultarID = async(req,res)=>{
    const id = req.params.id
    console.log(id)

    try {
        const cliente = await Cliente.findByPk(id)

        if(!cliente){
            return res.status(404).json({message: "Erro ao consultar cliente por id"})
        }

        const bytes = cryptoJs.AES.decrypt(cliente.cpf,CHAVE_SECRETA)
        const cpfDescriptografado = bytes.toString(cryptoJs.enc.Utf8)

        return res.status(200).json({
            codigo_cliente: cliente.codCliente,
            nome: cliente.nome,
            email: cliente.email,
            cpf: cpfDescriptografado,
            celular: cliente.celular
        })

    } catch (err) {
        console.error('Erro ao consultar o Cliente',err)
        res.status(500).json({message: "Erro ao consultar o Cliente "})
    }
}

// const consultarNome = async(req,res)=>{
//     const nome = req.params.nome
//     console.log(nome)

//     try {
//         const cliente = await Cliente.findOne({where: {nome: nome}})

//         if(!cliente){
//             return res.status(404).json({message: "Erro ao consultar cliente por id"})
//         }

//         const bytes = cryptoJs.AES.decrypt(cliente.cpf,CHAVE_SECRETA)
//         const cpfDescriptografado = bytes.toString(cryptoJs.enc.Utf8)

//         return res.status(200).json({
//             codigo_cliente: cliente.codCliente,
//             nome: cliente.nome,
//             email: cliente.email,
//             cpf: cpfDescriptografado,
//             celular: cliente.celular
//         })

//     } catch (err) {
//         console.error('Erro ao consultar o Cliente',err)
//         res.status(500).json({message: "Erro ao consultar o Cliente "})
//     }
// }

const apagar = async(req,res)=>{
    const id = req.params.id

    try {
        const cliente = await Cliente.findByPk(id)
        if(!cliente){
            return res.status(404).json({message: "Erro ao consultar cliente por id"})
        }
     
        await cliente.destroy({where: {codCliente: id}})
        return res.status(200).json({message: "Dados excluidos com sucesso!"})
        
    } catch (err) {
        console.error('Erro ao apagar o Cliente',err)
        res.status(500).json({message: "Erro ao apagar o Cliente "})
    }
}

const listar = async(req,res)=>{
    try {
        
        const clientes = await Cliente.findAll()
        let resultado = []
        let cpfDescriptografado = ''

        clientes.forEach((el)=>{
            const bytes = cryptoJs.AES.decrypt(el.cpf,CHAVE_SECRETA)
            cpfDescriptografado = bytes.toString(cryptoJs.enc.Utf8)

            resultado.push({
                codigo_cliente: el.codCliente,
                nome: el.nome,
                email: el.email,
                senha: el.senha,
                cpf: cpfDescriptografado,
                celular: el.celular
            })

        })
        
        res.status(200).json(resultado)

    } catch (err) {
        console.error('Erro ao listar o Cliente',err)
        res.status(500).json({message: "Erro ao listar o Cliente "})
    }
}

const atualizar = async(req,res)=>{

    const id = req.params.id
    const valores = req.body


    if(!valores.nome || !valores.email || !valores.senha || !valores.cpf || !valores.celular){
        return res.status(400).json({message: "Todos os campos são obrigatórios!"})
    }
    
    if(!valores.cpf.length !== 11){
        return res.status(400).json({message: "Cpf inválido!"})
    }

    try {
       
        let dados = await Cliente.findByPk(id)
        if(!dados){
            return res.status(404).json({message: "Erro ao encontrar o cliente"})
        }else{

        valores.senha= cryptoJs.AES.encrypt(valores.senha, CHAVE_SECRETA).toString()
        valores.cpf = cryptoJs.AES.encrypt(valores.cpf, CHAVE_SECRETA).toString()

            await Cliente.update({where: {codCliente: id}})
            dados = await Cliente.findByPk(id)
            
            const bytes = cryptoJs.AES.decrypt(valores.cpf,CHAVE_SECRETA)
            const cpfDescriptografado = bytes.toString(cryptoJs.enc.Utf8)

            res.status(200).json({
                codigo_cliente: dados.codCliente,
                nome: dados.nome,
                email: dados.email,
                cpf: cpfDescriptografado,
                celular: dados.celular

            })
        }

    } catch (err) {
        console.error('Erro ao atualizar o Cliente',err)
        res.status(500).json({message: "Erro ao atualizar o Cliente "})
    }

}




module.exports = {cadastrar, consultarID, apagar, listar, atualizar}