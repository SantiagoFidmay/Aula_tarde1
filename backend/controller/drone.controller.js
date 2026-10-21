const Drone = require('../models/Drone')


// Cadastro e listagem geral

const cadastrar = async(req,res)=>{
    const valores = req.body
    
    if(!valores.modelo || !valores.marca || !valores.numeroSerie || !valores.tipo || !valores.idCliente){
        return res.status(400).json({message: "Todos os campos são obrigatórios!"})
    }


    try {
        

       await Drone.create({
            modelo: valores.modelo,
            marca: valores.marca,
            numeroSerie: valores.numeroSerie,
            tipo: valores.tipo,
            idCliente: valores.idCliente
       })

       res.status(201).json({message: "Drone cadastrado com sucesso!"})


    } catch (err) {
        console.error('Erro ao cadastrar Drone',err)
        res.status(500).json({message: "Erro ao cadastrar Drone "})
        
    }
}

const listar = async(req,res)=>{
    try {
        const drones = await Drone.findAll()
        
        if(!drones){
            return res.status(400).json({message: "Drones não encontrados!"})
        
        }else{
            return res.status(200).json(drones)
        }


    } catch(err){
        console.error('Erro ao cadastrar Drone',err)
        res.status(500).json({message: "Erro ao cadastrar Drone "})
    }
}

module.exports = {cadastrar, listar}