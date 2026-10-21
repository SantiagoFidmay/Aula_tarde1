const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html'
}

const resposta = document.getElementById('resposta')
const btn_cadastrar = document.getElementById('btn_cadastrar')

btn_cadastrar.addEventListener('click', (e)=>{
    e.preventDefault()

    const data = document.getElementById('data').value
    const hora = document.getElementById('hora').value
    const idCliente = document.getElementById('idCliente').value
    const idDrone = document.getElementById('idDrone').value

    const valores = {
        data: data,
        hora: hora,
        idCliente: idCliente,
        idDrone: idDrone,
    }

    fetch('http://localhost:3000/agendamento',{
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
        console.error('Erro ao cadastrar agendamento',err)
        resposta.innerHTML = '<p>Erro ao cadastrar agendamento!</p>'
    })
})

