import { React, useState, useEffect } from 'react'
import axios from 'axios'
import styles from './Artigo.module.css'

export default function Artigo(props) {
    const [artigo, setArtigo] = useState(null)
    const [liked, setLiked] = useState(false)

    useEffect(() => {
        (async () => {
            await getArtigo()
        })()
    }, [props.artigoId])

    async function getArtigo() {
        if(!props.artigoId) return;
        var resp;
        try {
            resp = await axios.get(process.env.NEXT_PUBLIC_URL_API + 'artigos/' + props.artigoId)
        } catch (err) {
            return console.log(err)
        }

        const artigo = resp.data.data
        if (!artigo) return clearArtigo()

        setArtigo(artigo)
    }

    async function incrementarLike() {
        var resp;
        try {
            resp = await axios.post(process.env.NEXT_PUBLIC_URL_API + 'artigos/' + props.artigoId + '/like')
        } catch (err) {
            return console.log(err)
        }
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
