import styled from "styled-components"

const Page = styled.div`
    height: 100vh;
    width: 100%;
    align-items: center;
    justify-content: center;
    align-items: center;
    display: flex;
    justify-content: center;
`

const ServerStatus = styled.div`
    position: absolute;
    top: 0;
    left: 0;
`

const StatusText = styled.h1`
    font-family: 'Share Tech Mono', monospace;
    color: #707070;
    font-size: 16px;
    margin: 10px;
    margin-top: 30px;
`

const Status = styled.h1`
    font-family: 'Share Tech Mono', monospace;
    margin: 10px;
    font-size: 16px;
    color: ${props => props.online ? '#2c8b0ec5' : '#a51616c5'}
`

const StatusData = styled.h1`
    font-family: 'Share Tech Mono', monospace;
    color: #707070;
    font-size: 13px;
    margin: 10px;
`


export {Page, ServerStatus, StatusText, StatusData,Status}