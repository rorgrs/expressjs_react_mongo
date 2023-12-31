import { React, useState, useEffect } from 'react'
import BaseService from '../services/baseService'

export default function ArtigosHome() {
    const [htmlArtigosDestaque, setArtigosDestaque] = useState(null)
    const [htmlArtigosCurtidos, setArtigosCurtidos] = useState(null)

    useEffect(() => {
        (async () => {
            var resp = await BaseService.get('artigos/lista')
            if (!resp) return alert('Sem resposta do servidor.')
            if (!resp.success) return alert(resp.message)

            const artigos = resp.data
            if (!artigos) return

            var artigosDestaque = artigos.filter((e) => e.kb_featured)
            const htmlArtigosDestaque = artigosDestaque.map((artigo, index) => {
                return <li className="container artigo-item" key={index}>
                    <a className="link-artigo" href={'artigos/' + artigo._id}>{artigo.kb_title}</a>
                </li>;
            });

            setArtigosDestaque(htmlArtigosDestaque)

            const artigosCurtidos = artigos.sort((a, b) => b.kb_liked_count - a.kb_liked_count)
            const htmlArtigosCurtidos = artigosCurtidos.map((artigo, index) => {
                return <li className="container artigo-item" key={index}>
                    <a className="link-artigo" href={'artigos/' + artigo._id}>{artigo.kb_title + ' - ' + artigo.kb_liked_count + (artigo.kb_liked_count === 1 ? ' like' : ' likes')}</a>
                </li>;
            });

            setArtigosCurtidos(htmlArtigosCurtidos)
        })()
    }, [])

    return (
        <div className="container-se content">
            <div className="container-column artigos-container">
                <h2>Artigos em destaque</h2>
                <ul className="container-column">
                    {htmlArtigosDestaque}
                </ul>
            </div>
            <div className="container artigos-container">
                <h2>Artigos mais curtidos</h2>
                <ul className="container-column">
                    {htmlArtigosCurtidos}
                </ul>
            </div>
        </div>
    );
}
