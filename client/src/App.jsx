import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [gameId, setGameId] = useState('');
  const [token, setToken] = useState('');

  const handleCreateObject = async () => {
    try {
      const response = await axios.get(`${process.env.API_URL}/api/game/create`);
      setGameId(response.data.gameId);
      setToken(response.data.token);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.get(`${process.env.API_URL}/api/game`, { params: { gameId }});
      setToken(response.data.token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Object Management</h1>
      <div>
        <button onClick={handleCreateObject}>Create Object</button>
        <button onClick={handleLogin}>Login</button>
      </div>
      {gameId && <p>Game ID: {gameId}</p>}
      {token && <p>Token: {token}</p>}
    </div>
  );
}

export default App;