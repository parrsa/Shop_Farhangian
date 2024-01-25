import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {CacheProvider} from '@emotion/react'
import createCache from '@emotion/cache';
import {prefixer} from 'stylis'
import rtlPlugin from 'stylis-plugin-rtl';
import {CssBaseline, ThemeProvider} from '@mui/material';
import themeRtl from '@/Assets/theme/themeRtl';
import {useEffect} from 'react';
import {Provider} from "react-redux";

const cacheRTL = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
    prepend: true,
});

const cacheLTR = createCache({
    key: 'muiltr',
    prepend: true,
});


export default function App({Component, pageProps}: AppProps) {

    useEffect(() => {
        document.body.dir = "rtl"
    }, [])

    return (
        <CacheProvider value={themeRtl.direction === 'rtl' ? cacheRTL : cacheLTR}>
                <CssBaseline/>
                <ThemeProvider theme={themeRtl}>
                    <Component  {...pageProps} />
                </ThemeProvider>
            </CacheProvider>
    )
}

