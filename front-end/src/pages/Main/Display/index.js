import React from 'react'
import YouTube from 'react-youtube';
import { DisplayContainer } from './styles';
import Webcam from "react-webcam";

export default function Display(props){
    const {play,what} = props.display

    if(!play) 
        return <div/>

    const WebcamComponent = () => <Webcam width={1280} height={720}/>;

    return(
        <>
        <DisplayContainer>
            {what === 'youtube' &&
                <iframe width="1280" height="720" src={`https://www.youtube.com/embed/?listType=playlist&list=${props.display.props.id}&autoplay=1`} frameborder="0" autoplay/>
            }
            {what === 'webcam' &&
                <Webcam width={1280} height={720}/>
            }
        </DisplayContainer>
        </>
    )

}