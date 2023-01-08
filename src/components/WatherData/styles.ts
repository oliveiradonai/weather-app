import styled from 'styled-components';

import Clouds from '../../img/cloud-icon.png';
import Thunderstorm from '../../img/rain-icon.png';
import Drizzle from '../../img/rain-icon.png';
import Rain from '../../img/rain-icon.png';
import Snow from '../../img/snow-icon.png';
import Mist from '../../img/mist-icon.png';
import Clear from '../../img/clear-sky-icon.png';
import Default from '../../img/clear-sky-icon.png';

export const Container = styled.div`    
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 2.5rem;

    div {
        &.weatherLocation {
            font-size: 1.5rem;
            letter-spacing: 5px;
        }
    }

    div {
        &.weatherData {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;

            div {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: row;
            }
    
            h2 {
                font-family: 'Ubuntu', sans-serif;
                font-size: 4rem;
            }
    
            h3 {
                margin-top: 15px;
                font-family: 'Raleway', sans-serif;
                font-size: 1.4rem;
                text-align: center;
            }
        }
    }

    @media only screen and (max-width: 768px) {
        padding: 1rem;

        div {
            &.weatherLocation {
                text-align: center;
                font-size: .9rem;
            }
    }
    }
`

interface LogoProps {
    weatherType?: string;
}

export const Logo = styled.image<LogoProps>`
    ${props =>
        props.weatherType === "Clouds" ?
            `content: url(${Clouds})`
            :
            props.weatherType === "Thunderstorm" ?
                `content: url(${Thunderstorm})`
                :
                props.weatherType === "Drizzle" ?
                    `content: url(${Drizzle})`
                    :
                    props.weatherType === "Rain" ?
                        `content: url(${Rain})`
                        :
                        props.weatherType === "Snow" ?
                            `content: url(${Snow})`
                            :
                            props.weatherType === "Mist" ?
                                `content: url(${Mist})`
                                :
                                props.weatherType === "Clear" ?
                                    `content: url(${Clear})`
                                    :
                                    `content: url(${Default})`
    };

    height: 90px;
    margin-right: 10px;

    @media only screen and (max-width: 768px) {
        height: 50px;
    }
`