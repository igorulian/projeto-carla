import styled, { keyframes } from "styled-components"
import {fadeIn} from 'react-animations';

const animfadeIn = keyframes`${fadeIn}`


const DisplayContainer = styled.div`
    width: fit-content;
    height: fit-content;
    border-width: 2px;
    border-color: #ffc100;
    border-style: solid;
    box-shadow: 0 0 10px #ff7400;
    animation:  2s ${animfadeIn}
`

export {DisplayContainer}