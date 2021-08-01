import React, {useEffect, useState} from 'react';
import CirculoCentral from '../Components/CirculoCentral'
import '../styles.css'
import AudioSpectrum from 'react-audio-spectrum'
import {socket} from '../../services/socket'
import ReactLoading from 'react-loading'
import {Page, ServerStatus, Status, StatusData, StatusText} from './styles'

export default function Main(){
    const [connected,setconnected] = useState(false)
    const [loading,setLoading] = useState(false)
    const [listening,setListening] = useState(false)
    const [playing, setPlaying] = useState(false)
    const [cpu, setCpu] = useState(0)
    const [ram, setRam] = useState({percent: 0, using:0, total:0})
    let audio = new Audio('')

    
    useEffect(() => {

        socket.on('speak', async sck => {
            console.log('Socket recebido')
            audio.pause()
            setLoading(false)
            reloadAudio()
              
        })

        socket.on('usage', data => {
            const {cpu, ram} = data
            setRam(ram)
            setCpu(cpu)
        })

        socket.on('loading', data => {
            setLoading(data)
        })
    
        socket.on('connect', () => {
            setconnected(true)
        })

        socket.on('listeningcommand', data => {
            console.log('setando listining parta' + data)
            setListening(data)
        })
    
        socket.on('disconnect', () => {
            setconnected(false)
        })
    },[])   


    function reloadAudio(){
        const url = `http://localhost:4000/audio/${between(1,10000)}`
        audio = new Audio(url)  
        audio.load()
        audio.play()
        setPlaying(true)

    }

    function between(min, max) {  
        return Math.floor(
          Math.random() * (max - min) + min
        )
    }    



    return(

        <Page>

            <ServerStatus>
                <StatusText> Server Status: </StatusText>
                <Status online={connected}> {connected ? 'Online' : 'Offline'} </Status>

                <StatusText> CPU: </StatusText>
                <StatusData> {cpu}% </StatusData>

                <StatusText> RAM: </StatusText>
                <StatusData> {ram.percent}% </StatusData>
                <StatusData> {ram.using}G / {ram.total}G </StatusData>
            </ServerStatus>

            <CirculoCentral loading={loading} listening={listening}/>


        </Page>
    )
}