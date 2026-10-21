let resposta = document.getElementById('resposta')
let btn_cadCliente = document.getElementById('btn_cadCliente')

btn_cadCliente.addEventListener('click', (e)=>{
    e.preventDefault()

    let nome = document.getElementById('nome').value
    let email = document.getElementById('email').value
    let senha = document.getElementById('senha').value
    let cpf = document.getElementById('cpf').value
    let celular = document.getElementById('celular').value

    const valores = {
        nome: nome,
        email: email,
        senha: senha,
        cpf: cpf,
        celular: celular
    }

    fetch(`http://localhost:3000/cliente`,{
        method: 'POST',
        headers: {'Content-type':'application/json'},
        body: JSON.stringify(valores)
    })
    .then(res => res.json())
    .then(dados => {
        resposta.innerHTML = ``
        resposta.innerHTML += `${dados.message}`
    })
    .catch((err)=>{
        console.error('Erro ao cadastrar o cliente',err)
        resposta.innerHTML = 'Erro ao cadastrar o usuario'
    })

})