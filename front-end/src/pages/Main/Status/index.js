import React from 'react'
import {ServerStatus, Connected, StatusData, StatusText} from './styles'

export default function Status(props){
    const {connected, usage} = props

    return (
        <ServerStatus>
            <StatusText> Server Status: </StatusText>
            <Connected online={connected}> {connected ? 'Online' : 'Offline'} </Connected>

            <StatusText> CPU: </StatusText>
            <StatusData> {usage.cpu}% </StatusData>

            <StatusText> RAM: </StatusText>
            <StatusData> {usage.ram.percent}% </StatusData>
            <StatusData> {usage.ram.using}G / {usage.ram.total}G </StatusData>
        </ServerStatus>
    )
}