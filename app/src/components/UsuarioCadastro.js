import { React, useState, useEffect } from 'react'
import BaseService from '../services/baseService'

export default function UsuarioCadastro(props) {
    const [inputs, setInputs] = useState({ author_name: "", author_user: "", author_email: "", author_pwd: "", author_level: "normal", author_status: 1 })
    const [admin, setAdmin] = useState(false)

    useEffect(() => {
        (async () => {

        })()
    }, [])

    async function salvar() {
        var resp = await BaseService.post('usuarios', inputs)
        if (!resp) return alert('Sem resposta do servidor.')
        if (!resp.success) return alert(resp.message)
        window.location.href = "/"
    }

    function handleInputs(event) {
        setInputs({
            ...inputs,
            [event.target.id]: event.target.value
        })
    }

    function handleCheckbox(event) {
        setInputs({
            ...inputs,
            'author_level': event.target.checked ? 'admin' : 'normal'
        })
        setAdmin(event.target.checked)
    }

    return (
        <div className="form-container">
            <h2>Cadastro de Usuários</h2>
            <form className="container-column form-body" id="form" onSubmit={(e) => { e.preventDefault(); salvar() }}>

                <label htmlFor="author_name">Nome:</label>
                <input type="text" id="author_name" name="author_name" value={inputs.author_name} required onChange={handleInputs} />

                <label htmlFor="author_user">Login:</label>
                <input type="text" pattern="\S(.*\S)?" id="author_user" value={inputs.author_user} name="author_user" required onChange={handleInputs} />

                <label htmlFor="author_email">Email:</label>
                <input type="author_email" id="author_email" name="author_email" value={inputs.author_email} required onChange={handleInputs} />

                <label htmlFor="author_pwd">Senha:</label>
                <input type="password" id="author_pwd" name="author_pwd" value={inputs.author_pwd} required onChange={handleInputs} />

                <label htmlFor="author_level">Administrador:</label>
                <input type="checkbox" id="author_level" name="author_level" checked={admin} onChange={handleCheckbox} />

                <button type="submit">Cadastrar</button>

            </form>
        </div>
    );
}
