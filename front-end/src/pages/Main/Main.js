import React, {useEffect, useState} from 'react';
import CirculoCentral from '../Components/CirculoCentral'
import '../styles.css'
import AudioSpectrum from 'react-audio-spectrum'
import {socket} from '../../services/socket'
import {Page, Quadrado, CirculoContainer, DisplayContainer} from './styles'
import YouTube from 'react-youtube';
import Status from './Status';

export default function Main(){
    const [connected,setconnected] = useState(false)
    const [loading,setLoading] = useState(false)
    const [display,setDisplay] = useState(false)
    const [listening,setListening] = useState(false)
    const [playing, setPlaying] = useState(false)
    const [usage, setUsage] = useState({cpu: 0, ram: {percent: 0, using:0, total:0}})
    let audio = new Audio('')

    const youtubeOpts = {
        height: '720',
        width: '1280',
        playerVars: {
            autoplay: 1
        }
    }

    
    useEffect(() => {

        setTimeout(() => {
            setDisplay(true)
        },3000)

        socket.on('speak', async sck => {
            console.log('Socket recebido')
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

            <Status usage={usage} connected={connected}/>

            <CirculoContainer display={display} listening={listening}>
                <CirculoCentral loading={loading}/>
            </CirculoContainer>

            {display && <DisplayContainer>
                <YouTube videoId={'cIliVkpvVZw'} opts={youtubeOpts} onEnd={() => {setDisplay(false)}} pla/>
            </DisplayContainer>}

        </Page>
    )
}