const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html'
}

const resposta = document.getElementById('resposta')
const btn_listar = document.getElementById('btn_listar')

btn_listar.addEventListener('click', async (e) => {
    e.preventDefault()

    try {
        const res = await fetch(`http://localhost:3000/drones`, {
            headers: {'Authorization': token}
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
                    <th>Modelo</th>
                    <th>Marca</th>
                    <th>Numero serie</th>
                    <th>Tipo</th>
                    <th>Cod do cliente</th>
            
                </tr>
            </thead>
            <tbody>
                ${dados.map(el => `
                <tr>
                    <td>${el.codDrone}</td>
                    <td>${el.modelo}</td>
                    <td>${el.marca}</td>
                    <td>${el.numeroSerie}</td>
                    <td>${el.tipo}</td>
                    <td>${el.idCliente}</td>
                   
                </tr>
                `).join('')}
            </tbody>
        </table>
        `
    } catch (err) {
        console.error('Erro ao listar os dados', err)
        resposta.innerHTML = '<p>Erro ao listar os dados.</p>'
    }
})

