import React from 'react'
import YouTube from 'react-youtube';
import { DisplayContainer } from './styles';

export default function Display(props){
    const {play,what} = props.display
    
    if(!play) 
        return <> </>

    const youtubeOpts = {
        height: '720',
        width: '1280',
        playerVars: {
            autoplay: 1
        }
    }

    const Content = () => { //'cIliVkpvVZw'
        switch(what){
            case 'youtube':
                return  <YouTube videoId={props.display.props.id} opts={youtubeOpts} onEnd={props.onEnd}/>
            break;
        }
    }


    return(
        <DisplayContainer>
            <Content/>
        </DisplayContainer>
    )

}