import React from 'react';
import Main from './pages/main';
import io from 'socket.io-client';

const SERVER_URL = 'http://localhost:5000';
const socket = io.connect(SERVER_URL);

function App() {
  return (
    <div>
      <Main socket = { socket }/>
    </div>
  );
}

export default App;
