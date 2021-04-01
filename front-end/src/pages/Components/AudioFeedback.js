import React, { Component } from "react";
import audio from '../../audio.mp3'
import AudioSpectrum from 'react-audio-spectrum'

export default class AudioFeedback extends Component {
    
    render(){
        return(
            <>
                <audio id="audio-element"
                    preload="true"
                    src={audio}
                    autoPlay
                >
                </audio>
                <div style={{marginLeft: '10px', position: 'absolute', bottom: '0'}}>
                    <AudioSpectrum
                            id={"audio-container"}
                            height={400}
                            width={1700}
                            audioId={'audio-element'}
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
        )
    }
}