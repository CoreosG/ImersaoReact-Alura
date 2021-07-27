import styled from 'styled-components'

const BackgroundImage = styled.div`
    background-image: url("https://wallpaperaccess.com/full/235784.jpg");
    height: 100vh;
    min-height: 100%;
    width: 100vw;
    max-width: 100%;
    background-position: center;
    background-size: auto;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    /* background-repeat: repeat; */
    @media(min-width: 860px){
        background-size: cover;
        background-repeat: no-repeat;
        background-attachment: fixed;
    }
`
export default BackgroundImage;