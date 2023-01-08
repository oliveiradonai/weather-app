import styled from 'styled-components';
import Default from '../../img/default.jpg';

export const Container = styled.div`
    height: 100vh;
    width: 100vw;
    background-image: url(${Default});
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;

    h1{
        font-family: 'Ubuntu', sans-serif;
        font-size: 2.5rem;
        font-weight: bold;
        text-align: center;
        color: #151515;
    }
`