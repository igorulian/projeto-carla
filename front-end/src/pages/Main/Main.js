import React, {Component} from 'react';
import AudioSpectrum from 'react-audio-spectrum'
import CirculoCentral from './Components/CirculoCentral'
import './Main.css'
import audioTeste from './audio.mp3'

export default class Main extends Component{

    // constructor(props){
    //     // this.audio = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
    //  }

    render(){
        // const audiospec = (id) => (
        //  )

        return(   
            <div className="page">
                
                <CirculoCentral/>

                <audio id="audio-element"
                    preload="true"
                    src={audioTeste}
                    autoPlay
                >
                </audio>

                <audio id="audio-element-2"
                    preload="true"
                    src={audioTeste}
                    autoPlay
                >
                </audio>
                <div style={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap:'wrap',
                    justifyContent: 'center',
                }}>

                    {/* <div className="circulo"/> */}

                    <div className="div-spectrum">
                        <AudioSpectrum
                            id={"audio-container"}
                            height={400}
                            width={330}
                            audioId={'audio-element'}
                            capColor={'red'}
                            capHeight={0}
                            meterWidth={3}
                            meterCount={100}
                            meterColor={[
                                {stop: 0, color: '#ff7400'},
                                {stop: 0.5, color: '#ff9a00'},
                                {stop: 1, color: '#ff9a00'}
                            ]}
                            gap={10}
                        />
                    </div>
                    <div className="div-spectrum">
                        <AudioSpectrum
                            id={"audio-container-2"}
                            height={400}
                            width={3300}
                            audioId={'audio-element-2'}
                            capColor={'red'}
                            capHeight={0}
                            meterWidth={3}
                            meterCount={100}
                            meterColor={[
                                {stop: 0, color: '#ff7400'},
                                {stop: 0.5, color: '#ff9a00'},
                                {stop: 1, color: '#ff9a00'}
                            ]}
                            gap={10}
                        />
                    </div>

                </div>

            </div>
        )
    }


}