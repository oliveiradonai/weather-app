import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 50px;
    margin-bottom: 2.5rem;

    div {
        &.css-1s2u09g-control,
        &.css-1pahdxg-control {
            color: #000000 !important;
            background-color: rgba(255, 255, 255, 0.438) !important;
        }
    }

    div {
        &.css-14el2xx-placeholder {
            color: #000000 !important;
        }
    }

    div {
        &#react-select-3-listbox {
            background-color: rgba(255, 255, 255, 0.904) !important;
        }
    }

    div {
        &.css-319lph-ValueContainer {
            cursor: text !important;
        }
    }

    div {
        &.css-b62m3t-container {
            font-family: 'Raleway';
            color: black;
            padding: 5.5px;
            font-size: 1.2rem;
            border: none;
            width: 500px;
            border-radius: 5px;
            text-align: center;
            cursor: text !important;
        }
    }

    div {
        button {
            margin-left: 5px;
            padding: 6px 10px;
            background: #ddd;
            font-size: 1.3rem;
            border: none;
            cursor: pointer;
            border-radius: 5px;

            img {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 24px;
            }

            &:hover {
                background: #ccc;
            }
        }
    }
`