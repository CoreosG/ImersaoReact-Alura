import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { AlurakutStyles } from '../src/lib/AluraKutCommons';

const GlobalStyle = createGlobalStyle`
  /* Reset CSS */
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    /* background-color: #D9E6F6; */
    font-family: sans-serif;
    min-height: 100% !important;
    height: 100%;
    background-image: linear-gradient(to left, #010705, #020202)
  }

  html {
    height: 100%;
  }

  #_next {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  ${AlurakutStyles}
`

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
