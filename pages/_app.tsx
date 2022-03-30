import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { lightTheme, darkTheme, customTheme } from '../themes'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={ darkTheme }>
            <CssBaseline /> {/* es como normalize */}
            <Component {...pageProps} />
        </ThemeProvider>
    )
}

export default MyApp
