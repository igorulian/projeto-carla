import React, {Component} from 'react';
import './CirculoCentral.css'
import ReactLoading from 'react-loading'

export default class CirculoCentral extends Component{

    

    render(){
        return(  
            <>
                <div id="loader-wrapper" style={this.props.styles}>
                    <div id="loader">
                        <div id="loader1"/>
                        
                    </div>
                    <p>L.I.N.D.A</p>    

                    {this.props.loading &&
                        <ReactLoading className="loading" type={'bars'} color={'#ffc100'} height={40} width={40}/> 
                    }
                </div>
            </>
        )
    }


}