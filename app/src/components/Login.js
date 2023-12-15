import { React, useState, useEffect } from 'react'
import BaseService from '../services/baseService'

export default function Login() {
    const [inputs, setInputs] = useState({
        usuario: "",
        senha: ""
    });

    useEffect(() => {
        (async () => {

        })()
    }, [])

    async function login() {
        var resp = await BaseService.post('login', inputs)
        if (!resp) return alert('Sem resposta do servidor.')
        if (!resp.success) return alert(resp.message)
        sessionStorage.setItem('token', resp.data.token)
        sessionStorage.setItem('id', resp.data.id)
        window.location.href = "/";
    }

    function handleInput(event) {
        setInputs({
            ...inputs,
            [event.target.id]: event.target.value
        })
    }

    return (
        <div className="form-container">
            <h2>Login</h2>
            <form className="container-column form-body" id="form" onSubmit={(e) => { e.preventDefault(); login() }} method="post">

                <label htmlFor="usuario">Usuário:</label>
                <input type="text" pattern="\S(.*\S)?" id="usuario" name="usuario" value={inputs.usuario} required onChange={handleInput} />

                <label htmlFor="senha">Senha:</label>
                <input type="password" id="senha" name="senha" required value={inputs.senha} onChange={handleInput} />

                <button type="submit" className="botao">Entrar</button>

            </form>
        </div>
    );
}
