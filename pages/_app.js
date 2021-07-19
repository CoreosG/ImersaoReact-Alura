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
    background-image: url("https://theartmad.com/wp-content/uploads/2015/08/Doctor-Who-Wallpaper-Tardis-In-Space-1.png");
    background-size: cover;
    background-color: #D9E6F6;
    font-family: sans-serif;
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
