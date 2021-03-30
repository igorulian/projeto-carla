import React, {Component} from 'react';
import './CirculoCentral.css'

export default class CirculoCentral extends Component{

    

    render(){
        return(  
            <>
                <div id="loader-wrapper" style={this.props.styles}>
                    <div id="loader">
                        <div id="loader1"/>
                        
                    </div>
                    <p style={this.props.txtstyle}>L.I.N.D.A</p>
                </div>
            </>
        )
    }


}