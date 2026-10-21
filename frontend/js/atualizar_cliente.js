const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html'
}

const resposta = document.getElementById('resposta')
const btn_atualizar = document.getElementById('btn_atualizar')

btn_atualizar.addEventListener('click', async(e)=>{
    e.preventDefault()

    
    const codCliente = Number(document.getElementById('codCliente').value)
    const nome = document.getElementById('nome').value
    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value
    const cpf = document.getElementById('cpf').value
    const celular = document.getElementById('celular').value

    const clienteAtualizado = {
        nome: nome,
        email: email,
        senha: senha,
        cpf: cpf,
        endereco: endereco,
        celular: celular
    }

    try {
        const res = await fetch(`http://localhost:3000/cliente/${codCliente}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json', 'Authorization': token},
            body: JSON.stringify(clienteAtualizado)
        })

        const dados = await res.json()

        if (dados.message) {
            resposta.innerHTML = `<p>${dados.message}</p>`
            return
        }

        resposta.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>CPF</th>
                    <th>Celular</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>${dados.codigo_cliente}</td>
                    <td>${dados.nome}</td>
                    <td>${dados.email}</td>
                    <td>${dados.cpf}</td>
                    <td>${dados.celular}</td>
                </tr>
            </tbody>
        </table>
        `

        document.querySelector('form').reset()

    } catch (err) {
        console.error('Erro ao atualizar os dados', err)
        resposta.innerHTML = '<p>Erro ao tentar atualizar o cliente.</p>'
    }
})
