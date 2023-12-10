import { React } from 'react'
import { useRouter } from 'next/router'
import Header from '@/components/Header'
import ArtigoCadastro from '@/components/ArtigoCadastro'

export default function Cadastro() {
    const router = useRouter()
    return (
        <main>
            <Header />
            <ArtigoCadastro artigoId={router.query.id}/>
        </main>
    );
}
