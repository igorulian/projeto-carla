import React, {useEffect, useState} from 'react';
import CirculoCentral from '../Components/CirculoCentral'
import './Main.css'
import AudioSpectrum from 'react-audio-spectrum'
import {socket} from '../../services/socket'
import ReactLoading from 'react-loading';

export default function Main(){
    const [connected,setconnected] = useState(false)
    const [loading,setLoading] = useState(false)
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
            setLoading(true)
        })
    
        socket.on('connect', () => {
            setconnected(true)
        })
    
        socket.on('disconnect', () => {
            setconnected(false)
        })
    },[])   


    function reloadAudio(){
        const url = `http://localhost:4000/audio/${between(1,1000000)}`
        audio = new Audio(url)  
        audio.load()
        audio.play()
    }

    function between(min, max) {  
        return Math.floor(
          Math.random() * (max - min) + min
        )
    }
    



    return(

        <div className="page" style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center'}}>

            <div className="server-data">
                <h1 className={'server-status-text'}> Server Status: </h1>
                <h1 className={connected ? 'online' : 'offline'}> {connected ? 'Online' : 'Offline'}</h1>

                <h1 className={'server-status-text'}> CPU: </h1>
                <h1 className={'server-status-data'}> {cpu}% </h1>
                <h1 className={'server-status-text'}> RAM: </h1>
                <h1 className={'server-status-data'}> {ram.percent}% </h1>
                <h1 className={'server-status-data'}> {ram.using}G / {ram.total}G </h1>
            </div>

            <CirculoCentral loading={loading}/>

        </div>
    )
}