import React, {Component, useEffect} from 'react';
import './CirculoCentral.css'
import ReactLoading from 'react-loading'

export default function CirculoCentral(props){
    
        return(  
            <>
                <div id="loader">
                    <div id="loader1"/>
                </div>
                <p>L.I.N.D.A</p>    

                {props.loading &&
                    <ReactLoading className="loading" type={'bars'} color={'#ffc100'} height={40} width={40}/> 
                }
            </>
        )
}