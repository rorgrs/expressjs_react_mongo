import { React } from 'react'
import { useRouter } from 'next/router'
import Header from '@/components/Header'
import Artigo from '@/components/Artigo'


export default function Visualizar() {
    const router = useRouter()
    return (
        <main>
            <Header />
            <Artigo artigoId={router.query.id}/>
        </main>
    );
}
