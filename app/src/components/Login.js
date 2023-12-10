import { React, useState, useEffect } from 'react'
import axios from 'axios'

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
        var resp;
        try {
            resp = await axios.post(process.env.NEXT_PUBLIC_URL_API + 'login/', inputs)
        } catch (err) {
            return console.log(err)
        }
        if (!resp || !resp.data) return
        if (!resp.data.token && !resp.data.success) return alert(resp.data.message)
        var token = resp.data.token
        var id = resp.data.id
        sessionStorage.setItem('token', token)
        sessionStorage.setItem('id', id)
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
            <form className="container-column form-body" id="form" onSubmit={login} method="post">

                <label htmlFor="usuario">Usuário:</label>
                <input type="text" pattern="\S(.*\S)?" id="usuario" name="usuario" value={inputs.usuario} required onChange={handleInput} />

                <label htmlFor="senha">Senha:</label>
                <input type="password" id="senha" name="senha" required value={inputs.senha} onChange={handleInput} />

                <button type="submit" className="botao">Entrar</button>

            </form>
        </div>
    );
}
