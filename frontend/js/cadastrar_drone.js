const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html'
}

const resposta = document.getElementById('resposta')
const btn_cadastrar = document.getElementById('btn_cadastrar')

btn_cadastrar.addEventListener('click', (e)=>{
    e.preventDefault()

    const modelo = document.getElementById('modelo').value
    const marca = document.getElementById('marca').value
    const numeroSerie = document.getElementById('numeroSerie').value
    const tipo = document.getElementById('tipo').value
    const idCliente = document.getElementById('idCliente').value
   

    const valores = {
        modelo: modelo,
        marca: marca,
        numeroSerie: numeroSerie,
        tipo: tipo,
        idCliente: idCliente
    }

    fetch('http://localhost:3000/drone',{
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': token},
        body: JSON.stringify(valores)
    })
    .then(res => res.json())
    .then(dados =>{
        resposta.innerHTML = ''
        resposta.innerHTML += `<p>${dados.message}</p>`
    })
    .catch((err)=>{
        console.error('Erro ao cadastrar drone',err)
        resposta.innerHTML = '<p>Erro ao cadastrar drone!</p>'
    })
})

