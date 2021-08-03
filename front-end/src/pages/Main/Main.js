import React, {useEffect, useState} from 'react';
import CirculoCentral from '../Components/CirculoCentral'
import '../styles.css'
import AudioSpectrum from 'react-audio-spectrum'
import {socket} from '../../services/socket'
import {Page, CirculoContainer} from './styles'
import Status from './Status';
import Display from './Display';

export default function Main(){
    const [connected,setconnected] = useState(false)
    const [loading,setLoading] = useState(false)
    const [display,setDisplay] = useState({play: false, what: '', props:{}})
    const [listening,setListening] = useState(false)
    const [playing, setPlaying] = useState(false)
    const [usage, setUsage] = useState({cpu: 0, ram: {percent: 0, using:0, total:0}})
    let audio = new Audio('')
    
    useEffect(() => {

        socket.on('speak', async sck => {
            audio.pause()
            setLoading(false)
            reloadAudio()
        })

        socket.on('usage', data => {
            setUsage(data)
        })

        socket.on('loading', data => {
            setLoading(data)
        })
    
        socket.on('connect', () => {
            setconnected(true)
        })
        
        socket.on('stopdisplay', () => {
            setDisplay({play:false})
        })

        socket.on('playyoutube', data => {
            setDisplay({play:true, what: 'youtube', props: {id: data.id}})
            console.log({play:true, what: 'youtube', props: {id: data.id}})
        })

        socket.on('stopyoutube', () => {
            setDisplay({play:false})
        })

        socket.on('listeningcommand', data => {
            setListening(data)
            
            setTimeout(() => {
                setListening(false)
            }, 10000)
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

            <Status usage={usage} connected={connected}/>

            <CirculoContainer display={display} listening={listening}>
                <CirculoCentral loading={loading}/>
            </CirculoContainer>

            <Display display={display} onEnd={() => {setDisplay(false)}}/>

        </Page>
    )
}