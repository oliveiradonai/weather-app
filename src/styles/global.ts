import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';

import Clouds from '../img/few-clouds.jpg';
import Thunderstorm from '../img/thunderstorm.jpg';
import Drizzle from '../img/rain.jpg';
import Rain from '../img/rain.jpg';
import Snow from '../img/snow.jpg';
import Mist from '../img/mist.jpg';
import Clear from '../img/clear-sky.jpg';
import Default from '../img/default.jpg';

export const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body{
        color: #ffff;
        background-image: url(${Default});
        background-size: cover;
    }

    /* body::after{
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.671);
        opacity: .5;
        z-index: -1;
    } */

    @media (max-width: 1080px) {
        html{
            font-size: 93.75%;
        }
    }

    @media (max-width: 720px) {
        html{
            font-size: 87.5%;
        }
    }

    body, input, select, textarea, button{
        font: 300 1rem "Raleway", sand-serif;
    }

    button{
        cursor: pointer;
    }

    a{
        color: inherit;
        text-decoration: none;
    }
`

interface ContainerProps {
    weatherType?: string;
}

export const Container = styled.div<ContainerProps>`
    ${props => 
        props.weatherType === "Clouds" ?
            `background-image: url(${Clouds})`
        :
        props.weatherType === "Thunderstorm" ?
            `background-image: url(${Thunderstorm})`
        :
        props.weatherType === "Drizzle" ?
            `background-image: url(${Drizzle})`
        :
        props.weatherType === "Rain" ?
            `background-image: url(${Rain})`
        :
        props.weatherType === "Snow" ?
            `background-image: url(${Snow})`
        :
        props.weatherType === "Mist" ?
            `background-image: url(${Mist})`
        :
        props.weatherType === "Clear" ?
            `background-image: url(${Clear})`
        :
            `background-image: url(${Default})`
    };
    background-size: cover;
    width: 100vw;
    height: 100vh;
`