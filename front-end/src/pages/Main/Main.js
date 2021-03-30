import React, {Component} from 'react';
import CirculoCentral from '../Components/CirculoCentral'
import './Main.css'
import openSocket from 'socket.io-client'; 
import AudioFeedback from '../Components/AudioFeedback'

export default class Main extends Component{

    async componentDidMount(){
        await this.conectarEOuvirSocket();
        await this.emmitSocket()
    }

    async conectarEOuvirSocket() {
        try{
            const socket = openSocket('http://localhost:3001')
            socket.on('say', data => {
                console.log(data)
                alert("SAY")
            })
            alert('Socket ouvindo')
        }catch{
            alert("Erro ao conectar socket")
        }
    }

    async emmitSocket(){
        const socket = await openSocket('http://localhost:3001')
        const request = {
            say: true
        }
        socket.emit('sayed', request)
    }

    render(){

        return(   
            <div className="page">
                <CirculoCentral/>
                <AudioFeedback/>

            </div>
        )
    }


}