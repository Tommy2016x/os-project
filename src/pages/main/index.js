import React, { Component } from 'react';
import './style.scss';

import GraphDisplay from "react-graph-vis";

const options = {
  layout: {
    hierarchical: true
  },
  edges: {
    color: "#000000"
  },
  height: "500px"
};

const events = {
  select: function(event) {
    var { nodes, edges } = event;
  }
};

class Main extends Component{
  constructor(props){
    super(props);

    this.state = {
      graph: null
    }
  }

  async componentDidMount(){
    const { socket } = this.props;

    socket.on('host-send_data', (data) => {
      console.log('setting data');
      this.setState({ graph: null })
      let id = 1;
      let ids = {};
      const edges = [];
      const nodes = [];

      data.split('\n').forEach(line => {
        const [from, to, count] = line.split(',');

        if(!ids.hasOwnProperty(from)){
          ids[from] = id++;
          const newNode = { id: ids[from], label: from, title: from };
          nodes.push(newNode)
        }

        if(!ids.hasOwnProperty(to)){
          ids[to] = id++;
          const newNode = { id: ids[to], label: to, title: to }
          nodes.push(newNode);
        }

        const newEdge = { to: ids[to], from: ids[from], label: count }
        edges.push(newEdge);
      });
      const graph = { nodes, edges }
      console.log(graph)

      this.setState({ graph });
    });

    socket.emit('client-get_data');
  }

  render(){
    const { graph } = this.state;

    return(
      graph ? 
      <div className='container'>
        <GraphDisplay
          graph={ graph }
          options={options}
          events={events}
          getNetwork={network => {
            //  if you want access to vis.js network api you can set the state in a parent component using this property
          }}
        />
      </div>
      :
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }
}

export default Main;