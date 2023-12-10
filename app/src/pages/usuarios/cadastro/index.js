import { React } from 'react'
import { useRouter } from 'next/router'
import Header from '@/components/Header'
import UsuarioCadastro from '@/components/UsuarioCadastro'

export default function Index() {
    return (
        <main>
            <Header />
            <UsuarioCadastro />
        </main>
    );
}
