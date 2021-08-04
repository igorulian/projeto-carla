import styled, { css, keyframes } from "styled-components"
import {slideInUp,slideInDown} from 'react-animations';

const animUP = keyframes`${slideInUp}`
const animDown = keyframes`${slideInDown}`

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
    transform: ${props => props.display.play ? 'scale(0.5)' : 'scale(1)'};
    ${props => props.display.play ? 'margin-top: -40px' : 'margin-top: -20px'};
    ${props => props.display.play ? 'top: 0' : ''};
    animation: ${props => props.display.play ? css`1s ${animUP}` :  css`1s ${animDown}` }
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

const SpeakingText = styled.p`
    margin-bottom: 30px;
    font-size: 15px;
    text-shadow: 0 0 40px #ff9a00;
`

export {Page, CirculoContainer,Quadrado,SpeakingText}