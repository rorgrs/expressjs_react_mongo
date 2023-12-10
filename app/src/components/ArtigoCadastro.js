import { React, useState, useEffect } from 'react'
import axios from 'axios'

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
            try {
                resp = await axios.post(process.env.NEXT_PUBLIC_URL_API + 'artigos', inputs, { headers: { 'token': sessionStorage.getItem('token'), 'Content-Type': 'application/json' } })
            } catch (err) {
                clearInputs()
                return console.log(err)
            }
        } else {
            try {
                inputs._id = props.artigoId
                resp = await axios.put(process.env.NEXT_PUBLIC_URL_API + 'artigos', inputs, { headers: { 'token': sessionStorage.getItem('token'), 'Content-Type': 'application/json' } })
            } catch (err) {
                clearInputs()
                return console.log(err)
            }
        }
        if (!resp.data.success) return alert(resp.data.message)
        window.location.href = "/artigos"
    }

    async function getArtigo() {
        if (!props.artigoId) return
        var resp;
        try {
            resp = await axios.get(process.env.NEXT_PUBLIC_URL_API + 'artigos/' + props.artigoId)
        } catch (err) {
            clearInputs()
            return console.log(err)
        }

        const artigo = resp.data.data
        if (!artigo) return clearInputs()

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
