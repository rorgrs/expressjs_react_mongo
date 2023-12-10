import { React, useState, useEffect } from 'react'
import Header from '@/components/Header';
import ArtigoLista from '@/components/ArtigoLista';
import axios from 'axios'

export default function Index() {
    return (
        <main>
            <Header />
            <ArtigoLista />
        </main>
    );
}
