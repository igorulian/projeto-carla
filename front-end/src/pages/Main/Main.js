import React, {Component, useEffect} from 'react';
import CirculoCentral from '../Components/CirculoCentral'
import './Main.css'
import AudioFeedback from '../Components/AudioFeedback'
import io from 'socket.io-client'


export default function Main(){

    const socketio = io('ws://localhost:4000')

    socketio.on('speak', socket => {
        speak()
    })

    function speak(){
        alert('speaking')
    }   

    return(    
        <>
            <div className="page" style={{alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                boxSizing: 'border-box'}}>

                {/* <div className="teste" style={{width: '40px', height: '40px', color: '#25f', backgroundColor: '#25f'}}/> */}

                <CirculoCentral/>
                <AudioFeedback/>

            </div>
        </>
    )
}