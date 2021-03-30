import React, {Component} from 'react';
import CirculoCentral from '../Components/CirculoCentral'
import AudioFeedback from '../Components/AudioFeedback'

export default class VideoDisplay extends Component{

    render(){
        return(
            <div>
                <div className="page">
                    <CirculoCentral txtstyle={{fontSize: '17px', marginLeft: '0px', marginTop: '-15px'}} styles={{marginTop: '50px', width: '200px', height: '200px', marginLeft: '48%'}} lindafont='20px'/>
                    <div style={{margin: '0 auto', position: 'absolute'}}>
                        <iframe width="420" height="315" //id         ||
                        src="https://www.youtube.com/embed/VTtE6VyBpBE?autoplay=1&mute=1">
                        </iframe> 
                    </div>
                    <AudioFeedback/>
                </div>
            </div>
        )
    }
}