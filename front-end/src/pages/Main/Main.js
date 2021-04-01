import React, {Component} from 'react';
import CirculoCentral from '../Components/CirculoCentral'
import './Main.css'
import AudioFeedback from '../Components/AudioFeedback'
import SocketCommands from '../Components/SocketCommands'

export default class Main extends Component{


    render(){

        return(   
            <>
                <SocketCommands/>
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


}