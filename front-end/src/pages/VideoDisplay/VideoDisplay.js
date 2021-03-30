import React, {Component} from 'react';
import CirculoCentral from '../Components/CirculoCentral'
import AudioFeedback from '../Components/AudioFeedback'

export default class VideoDisplay extends Component{

    render(){
        return(
            <div>
                <div className="page">
                    <CirculoCentral txtstyle={{fontSize: '14px', marginLeft: '7px', marginTop: '-12px'}} styles={{marginTop: '80px', width: '200px', height: '200px', marginLeft: '48%'}} lindafont='20px'/>
                    <div style={{margin: '0 auto', width: '47%', paddingTop: '150px'}}>
                        <iframe width="636" height="360" //id         ||
                        style={{border: '1px solid #f7bb01',
                        boxShadow:'0 0 10px #f7bb01'}}
                        src="https://www.youtube.com/embed/VTtE6VyBpBE?autoplay=1&mute=1">
                        </iframe> 
                    </div>
                    <AudioFeedback/>
                </div>
            </div>
        )
    }
}