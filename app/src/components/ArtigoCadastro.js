import { React, useState, useEffect } from 'react'
import BaseService from '../services/baseService'

export default function ArtigoCadastro(props) {
    const [inputs, setInputs] = useState({ kb_title: "", kb_body: "", kb_featured: "", _id: null });

    useEffect(() => {
        (async () => {
            await getArtigo()
        })()
    }, [props.artigoId])

    async function salvar() {
        var resp;
        if (!props.artigoId) {
            resp = await BaseService.post('artigos', inputs)
        } else {
            resp = await BaseService.put('artigos', inputs)
        }

        if (!resp) return alert('Sem resposta do servidor.')
        if (!resp.success) return alert(resp.message)

        window.location.href = "/artigos"
    }

    async function getArtigo() {
        clearInputs()
        if (!props.artigoId) return
        var resp = await BaseService.get()
        if (!resp) return alert('Sem resposta do servidor.')
        if (!resp.success) return alert(resp.message)
        const artigo = resp.data
        if (!artigo) return
        setInputs({ kb_body: artigo.kb_body, kb_title: artigo.kb_title, kb_featured: artigo.kb_featured })
    }

    function clearInputs() {
        setInputs({ kb_title: "", kb_body: "", kb_featured: "" })
    }

    function handleTitle(event) {
        setInputs({
            ...inputs,
            'kb_title': event.target.value
        })
    }
    function handleBody(event) {
        setInputs({
            ...inputs,
            'kb_body': event.target.value
        })
    }
    function handleFeatured(event) {
        setInputs({
            ...inputs,
            'kb_featured': event.target.checked
        })
    }

    return (
        <div className="form-container">
            <h2>Cadastro de Artigos</h2>
            <form className="container-column form-body" id="form" onSubmit={(e) => { e.preventDefault(); salvar() }}>
                <label htmlFor="titulo">Título:</label>
                <input type="text" name="titulo" value={inputs.kb_title} required onChange={handleTitle} />

                <label htmlFor="corpo">Corpo:</label>
                <textarea name="corpo" rows="4" cols="50" value={inputs.kb_body} required onChange={handleBody}></textarea>

                <label htmlFor="featured">Destaque:</label>
                <input type="checkbox" name="featured" checked={inputs.kb_featured} onChange={handleFeatured} />

                <button type="submit">Salvar</button>
            </form>
        </div>
    );
}
