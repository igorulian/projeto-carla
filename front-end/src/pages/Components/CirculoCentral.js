import React, {Component, useEffect} from 'react';
import './CirculoCentral.css'
import ReactLoading from 'react-loading'

export default function CirculoCentral(props){
    
        return(  
            <>
                <div id="loader-wrapper" style={{...props.styles, opacity: props.listening ? 1 : 0.5}}>
                    <div id="loader">
                        <div id="loader1"/>
                    </div>
                    <p>L.I.N.D.A</p>    

                    {props.loading &&
                        <ReactLoading className="loading" type={'bars'} color={'#ffc100'} height={40} width={40}/> 
                    }
                </div>
            </>
        )
}