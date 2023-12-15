import { React, useState, useEffect } from 'react'
import styles from './Artigo.module.css'
import BaseService from '../services/baseService'

export default function Artigo(props) {
    const [artigo, setArtigo] = useState(null)
    const [liked, setLiked] = useState(false)

    useEffect(() => {
        (async () => {
            await getArtigo()
        })()
    }, [props.artigoId])

    async function getArtigo() {
        if (!props.artigoId) return;
        var resp = await BaseService.get('artigos/' + props.artigoId)
        if (!resp) return alert('Sem resposta do servidor.')
        if (!resp.success) return alert(resp.message)

        const artigo = resp.data
        if (!artigo) return clearArtigo()
        setArtigo(artigo)
    }

    async function incrementarLike() {
        var resp = await BaseService.post('artigos/' + props.artigoId + '/like')
        if (!resp) return alert('Sem resposta do servidor.')
        if (!resp.success) return alert(resp.message)
        setLiked(true)
        await getArtigo()
    }

    function clearArtigo() {
        let artigo = {
            kb_title: 'Artigo não encontrado',
            kb_published_date: '--/--/--',
            kb_author_email: '--',
            kb_liked_count: '--',
            kb_body: 'Nada para ver por aqui'
        }

        setArtigo(artigo)
    }

    return (
        <div className="content container">
            {
                artigo ? <div className="container-column">
                    <div className={styles['artigo-title']}>
                        {artigo.kb_title}
                    </div>
                    <div className={'container ' + styles['artigo-info-container']}>
                        <div className={styles['artigo-info']}>
                            {artigo.kb_published_date}
                        </div>
                        <div className={styles['artigo-info']}>
                            {artigo.kb_author_email}
                        </div>
                        <div className={styles['artigo-info']}>
                            {artigo.kb_liked_count + (artigo.kb_liked_count === 1 ? ' like' : ' likes')}
                        </div>
                    </div>
                    <div className={styles['artigo-body']}>
                        {artigo.kb_body}
                    </div>
                    <button className="botao" disabled={liked} onClick={incrementarLike}>Like</button>
                </div> : ''
            }

        </div>
    );
}
