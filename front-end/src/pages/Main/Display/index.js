import React from 'react'
import YouTube from 'react-youtube';
import { DisplayContainer } from './styles';

export default function Display(props){
    const {play,what} = props.display

    console.log("aqui")
    
    if(!play) 
        return <div> </div>

    const youtubeOpts = {
        height: '720',
        width: '1280',
        playerVars: {
            autoplay: 1
        }
    }

    return(
        <DisplayContainer>
            {
                what === 'youtube' &&
                <YouTube videoId={props.display.props.id} opts={youtubeOpts} onEnd={props.onEnd}/>
            }
        </DisplayContainer>
    )

}