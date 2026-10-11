import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  const [apiStatus, setApiStatus] = useState('Checking...');
  const [dbStatus, setDbStatus] = useState('Checking...');

  useEffect(() => {
    fetch('http://localhost:5000/health')
      .then((res) => res.json())
      .then((data) => {
        setApiStatus(data.status);
        setDbStatus(data.database);
      })
      .catch(() => {
        setApiStatus('DISCONNECTED');
        setDbStatus('DISCONNECTED');
      });
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '40px', textAlign: 'center' }}>
      <h1>🚀 Enterprise DevOps Platform</h1>
      <p>3-Tier Microservices Architecture (React + Node.js + PostgreSQL)</p>
      <div style={{ display: 'inline-block', textAlign: 'left', background: '#f4f4f4', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
        <p><strong>Backend API Status:</strong> {apiStatus}</p>
        <p><strong>PostgreSQL Database:</strong> {dbStatus}</p>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);