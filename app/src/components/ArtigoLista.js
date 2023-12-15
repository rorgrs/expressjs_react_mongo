import { React, useState, useEffect } from 'react'
import BaseService from '../services/baseService'
import stylesArtigos from './Artigo.module.css'
import stylesLista from './ArtigoLista.module.css'

export default function ArtigoLista() {
    const [artigos, setArtigos] = useState(null)
    const [adminButton, setAdminButton] = useState(false)
    const [filtrosAtivos, setFiltrosAtivos] = useState(false)
    const [artigoFiltros, setArtigoFiltros] = useState('')

    useEffect(() => {
        (async () => {
            await validarUsuario()
            await getArtigos()
        })()
    }, [adminButton])

    async function validarUsuario() {
        let id = sessionStorage.getItem('id')
        if (!id) return
        var resp = await BaseService.get('usuarios/' + id)
        if (!resp) return alert('Sem resposta do servidor.')
        if (!resp.success) return alert(resp.message)
        const usuario = resp.data
        if (!usuario) return
        if (usuario.author_level !== 'admin') return
        setAdminButton(true)
    }

    async function getArtigos(query) {
        var req = 'artigos/lista/'
        if (query) req += query
        var resp = await BaseService.get(req)
        if (!resp) return alert('Sem resposta do servidor.')
        if (!resp.success) return alert(resp.message)
        const artigos = resp.data
        if (!artigos) return
        mapArtigos(artigos)
    }

    async function excluirArtigo(id) {
        var resp = await BaseService.delete('artigos/' + id)
        if (!resp) return alert('Sem resposta do servidor.')
        if (!resp.success) return alert(resp.message)
        setArtigoFiltros('')
        await pesquisarArtigos()
    }

    async function pesquisarArtigos() {
        if (!artigoFiltros) return await getArtigos()
        setFiltrosAtivos(true)
        await getArtigos(artigoFiltros)
    }

    async function limparFiltro() {
        setFiltrosAtivos(false)
        setArtigoFiltros('')
        await getArtigos()
    }

    function mapArtigos(artigos) {
        const htmlArtigos = artigos.map((artigo, index) => {
            return <div className={'container ' + stylesLista['lista-item']} key={artigo._id}>
                {
                    adminButton ?
                        <div className={'container ' + stylesLista['item-botoes']}>
                            <a className="botao" href={'/artigos/cadastro/' + artigo._id}>Editar</a>
                            <button className="botao botao-vermelho" onClick={() => excluirArtigo(artigo._id)}>Excluir</button>
                        </div> : ''
                }
                <a className={'container-column ' + stylesLista['artigo-clicavel']} href={'/artigos/' + artigo._id}>
                    <div className={stylesArtigos['artigo-title']}>
                        {artigo.kb_title}
                    </div>
                    <div className="container" id="metadados">
                        <div className={stylesArtigos['artigo-info']} id="data">
                            {artigo.kb_published_date}
                        </div>
                        <div className={stylesArtigos['artigo-info']} id="email">
                            {artigo.kb_author_email}
                        </div>
                        <div className={stylesArtigos['artigo-info']} id="likes">
                            {artigo.kb_liked_count + (artigo.kb_liked_count === 1 ? ' like' : ' likes')}
                        </div>
                    </div>
                </a>
            </div>;
        });

        setArtigos(htmlArtigos)
    }

    function handleArtigoFiltros(event) {
        setArtigoFiltros(event.target.value)
    }

    return (
        <div className={'container-column content ' + stylesLista.metade}>
            <div className={'container ' + stylesLista.pesquisa} id="barra-pesquisa">
                <input type="text" className={stylesLista['input-pesquisar']} id="pesquisa" placeholder="Pesquisar por título"
                    value={artigoFiltros} onChange={handleArtigoFiltros} />
                <button className={'botao ' + stylesLista['botao-pesquisar']} onClick={pesquisarArtigos}>Pesquisar</button>
                {
                    filtrosAtivos ? <button className="botao botao-vermelho" onClick={limparFiltro}>Limpar</button> : ''
                }
            </div>
            <div className="container-column" id="pai">
                {artigos}
            </div>
        </div>
    );
}
