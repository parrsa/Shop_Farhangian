import Head from 'next/head'
import Image from 'next/image'
import {Inter} from 'next/font/google'
import Index from '@/pages/login'
import Homes from "@/pages/home";

const inter = Inter({subsets: ['latin']})

export default function Home() {
    return (
        <>
            <Homes/>
        </>
    )
}
