import React, {Component, useEffect, useState} from 'react';
import CirculoCentral from '../Components/CirculoCentral'
import './Main.css'
import AudioSpectrum from 'react-audio-spectrum'
import {socket} from '../../services/socket'

export default function Main(){
    const [connected,setconnected] = useState(false)
    const [playing,setPlaying] = useState(false)

    
    useEffect(() => {

        socket.on('speak', async sck => {
            const audio = new Audio('http://localhost:4000/audio')
            audio.play()
            setPlaying(true)

            audio.onended = () => {
                alert('CABO')
                console.log('CABO')
                setPlaying(false)
                audio.remove()
            }
              
        })
    
        socket.on('connect', () => {
            setconnected(true)
        })
    
        socket.on('disconnect', () => {
            setconnected(false)
        })
    },[])



    return(    
        <>
            <h1 className={'server-status-text'}> Server Status: </h1>
            <h1 className={connected ? 'online' : 'offline'}> {connected ? 'Online' : 'Offline'}</h1>

            <div className="page" style={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                boxSizing: 'border-box'}}>

                <CirculoCentral/>
                
                <>
                    <div style={{marginLeft: '10px', position: 'absolute', bottom: '0'}}>
                        <AudioSpectrum
                            id={"audio-container"}
                            height={400}
                            width={1700}
                            capColor={'red'}
                            capHeight={0}
                            meterWidth={3}
                            meterCount={500}
                            meterColor={[
                                {stop: 0, color: '#ff7400'},
                                {stop: 0.5, color: '#ff9a00'},
                                {stop: 1, color: '#ff9a00'}
                            ]}
                            gap={10}
                        />
                    </div>
                </>

            </div>
        </>
    )
}