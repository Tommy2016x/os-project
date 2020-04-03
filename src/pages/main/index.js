import React, { Component } from 'react';
import Graph from '../../components/graph';
import './style.scss';
import io from 'socket.io-client';

const SERVER_URL = 'http://localhost:5000';
const socket = io.connect(SERVER_URL);

class Main extends Component{
  constructor(props){
    super(props);

    socket.on('host-send_data', (data) => {
      console.log(data);
    })
  }

  async componentDidMount(){
    socket.emit('client-get_data');
  }

  render(){
    return(
      <div className='container'>
        <Graph />
      </div>
    )
  }
}

export default Main;