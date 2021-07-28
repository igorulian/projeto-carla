import React, {Component} from 'react';
import CirculoCentral from '../Components/CirculoCentral'
import AudioFeedback from '../Components/AudioFeedback'
export default class VideoDisplay extends Component{


    state = {
        link: ''
    }


    componentDidMount(){
        const id = window.location.href.toString().split('/')[4]
        this.setState({link: `https://www.youtube.com/embed/${id}?autoplay=1&mute=1`})
    }


    render(){
        return(
            <div>
                <div className="page" style={{alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'center',      
                        boxSizing: 'border-box'}}>
                    <CirculoCentral txtstyle={{fontSize: '14px', marginLeft: '7px', marginTop: '-12px'}} styles={{marginTop: '80px', width: '200px', height: '200px', marginLeft: '49%'}} lindafont='20px'/>
                    
                    <div>
                        <iframe title="Video" width="1144" height="648"
                        style={{border: '1px solid #f7bb01',
                        boxShadow:'0 0 10px #f7bb01'}}
                        src={this.state.link}>
                        </iframe> 
                    </div>
                    <AudioFeedback/>
                </div>
            </div>
        )
    }
}