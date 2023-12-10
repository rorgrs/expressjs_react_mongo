import { React } from 'react'
import { useRouter } from 'next/router'
import Header from '@/components/Header'
import ArtigoCadastro from '@/components/ArtigoCadastro'

export default function Index() {
    return (
        <main>
            <Header />
            <ArtigoCadastro />
        </main>
    );
}
