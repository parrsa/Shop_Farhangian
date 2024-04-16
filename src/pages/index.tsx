import Image from 'next/image'
import { Inter } from 'next/font/google'
import Index from '@/pages/login'
import Homes from "@/pages/home";
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    return (
        <>
            <Head >
                <title>تعاونی مصرف فرهنگیان</title>
            </Head>
            <Homes />
        </>
    )
}
