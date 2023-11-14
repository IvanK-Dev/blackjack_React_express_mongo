import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [objectId, setObjectId] = useState('');
  const [token, setToken] = useState('');

  const handleCreateObject = async () => {
    try {
      const response = await axios.post('/api/create_game');
      setObjectId(response.data.objectId);
      setToken(response.data.token);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/auth/login', { objectId });
      setToken(response.data.token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Objects</h1>
      <div>
        <button onClick={handleCreateObject}>Create Object</button>
        <button onClick={handleLogin}>Login</button>
      </div>
      {objectId && <p>Object ID: {objectId}</p>}
      {token && <p>Token: {token}</p>}
    </div>
  );
}

export default App;
