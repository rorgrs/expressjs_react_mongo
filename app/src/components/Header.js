import { React, useState, useEffect } from 'react'
import axios from 'axios'

export default function Header() {
    const [usuario, setUsuario] = useState(null)
    const [adminButton, setAdminButton] = useState(false)
    const [logoutButton, setLogoutButton] = useState(false)

    useEffect(() => {
        (async () => {
            let id = sessionStorage.getItem('id')
            if (!id) return
            var resp;
            try {
                resp = await axios.get(process.env.NEXT_PUBLIC_URL_API + 'usuarios/' + id)
            } catch (err) {
                return console.log(err)
            }
            const usuario = resp.data.data
            if (!usuario) return
            setUsuario(usuario)
            setLogoutButton(true)
            if (usuario.author_level !== 'admin') return
            setAdminButton(true)
        })()
    }, [])

    function logout() {
        sessionStorage.clear()
        window.location.href = "/";
    }

    return (
        <header>
            <div className="container header-container titulo-header">
                <a href="/">Página Inicial</a>
            </div>
            <div className="container header-container pesquisa-header">
                <div className="container botoes-header">
                    <a className="botao" href="/artigos">Artigos</a>
                    {
                        adminButton ? <a className="botao" href="/artigos/cadastro">Criar Artigo</a> : ''
                    }
                    {
                        adminButton ? <a className="botao" href="/usuarios/cadastro">Criar Usuario</a> : ''
                    }
                </div>
                <div className="container botoes-header-auth">
                    {
                        logoutButton && usuario ? <div className="username">{usuario.author_name}</div> : ''
                    }
                    {
                        logoutButton ? '' : <a className="botao" href="/login">Login</a>
                    }
                    {
                        logoutButton ? <button className="botao botao-vermelho" onClick={logout}>Logout</button> : ''
                    }
                </div>
            </div>
        </header>
    );

};