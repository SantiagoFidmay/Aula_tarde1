const Agendamento = require('../models/Agendamento')


// Cadastro, atualização  listagem

const cadastrar = async(req,res)=>{
    const valores = req.body
    
    if(!valores.data || !valores.hora || !valores.idCliente || !valores.idDrone ){
        return res.status(400).json({message: "Todos os campos são obrigatórios!"})
    }

 
    try {
       

       await Agendamento.create({
            data: valores.data,
            hora: valores.hora,
            idCliente: valores.idCliente,
            idDrone: valores.idDrone,
          
       })

       res.status(201).json({message: "Agendamento cadastrado com sucesso!"})


    } catch (err) {
        console.error('Erro ao cadastrar Agendamento',err)
        res.status(500).json({message: "Erro ao cadastrar Agendamento "})
        
    }
}



const listar = async(req,res)=>{
    try {
        const agendamentos = await Agendamento.findAll()
        
        if(!agendamentos){
            return res.status(400).json({message: "Drones não encontrados!"})
        
        }else{
            return res.status(200).json(agendamentos)
        }


    } catch(err){
        console.error('Erro ao cadastrar Drone',err)
        res.status(500).json({message: "Erro ao cadastrar Drone "})
    }
}

const atualizar = async(req,res)=>{

    const id = req.params.id
    const valores = req.body


    if(!valores.data || !valores.hora || !valores.idCliente || !valores.idDrone ){
        return res.status(400).json({message: "Todos os campos são obrigatórios!"})
    }
    
  

    try {
       
        let dados = await Agendamento.findByPk(id)
        if(!dados){
            return res.status(404).json({message: "Erro ao encontrar o cliente"})
        }else{

            await Agendamento.update({where: {codAgendamento: id}})
            dados = await Agendamento.findByPk(id)
            

            res.status(200).json({
                codigo_agendamento: dados.codAgendamento,
                data: dados.data,
                hora: dados.hora,
                idCliente: dados.idCliente,
                idDrone: dados.idDrone,
                

            })
        }

    } catch (err) {
        console.error('Erro ao atualizar o Cliente',err)
        res.status(500).json({message: "Erro ao atualizar o Cliente "})
    }

}

module.exports = {cadastrar, listar, atualizar}