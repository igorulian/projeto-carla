import styled, { css, keyframes } from "styled-components"
import {slideInUp,slideInDown, fadeIn, fadeOut} from 'react-animations';

const animUP = keyframes`${slideInUp}`
const animDown = keyframes`${slideInDown}`
const animfadeIn = keyframes`${fadeIn}`
const animfadefadeOut = keyframes`${fadeOut}`

const CirculoContainer = styled.div`
    position: fixed;
    width: 300px;
    height: 300px;
    left: 0; 
    right: 0;
    margin: auto;
    align-items: center;
    justify-content: center;
    text-align: center;
    opacity: ${props => props.listening ? '1' : '0.4'};
    transition: opacity 0.2s ease-in;
    transform: ${props => props.display ? 'scale(0.5)' : 'scale(1)'};
    ${props => props.display ? 'margin-top: -40px' : ''};
    ${props => props.display ? 'top: 0' : ''};
    animation: ${props => props.display ? css`1s ${animUP}` :  css`1s ${animDown}` }
`;


const DisplayContainer = styled.div`
    width: 1280px;
    height: 720px;
    border-width: 2px;
    border-color: #ffc100;
    border-style: solid;
    box-shadow: 0 0 15px #ff7400;
    animation:  2s ${animfadeIn}
`

const Quadrado = styled.div`
    width: 200px;
    height: 200px;
    background-color: #333;
`

const Page = styled.div`
    height: 100vh;
    width: 100%;
    align-items: center;
    justify-content: center;
    align-items: center;
    display: flex;
    justify-content: center;
`

export {Page, CirculoContainer,Quadrado,DisplayContainer}