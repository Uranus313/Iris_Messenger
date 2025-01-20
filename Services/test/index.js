import { io } from 'socket.io-client';

const socket = io('https://localhost:3003', { path: '/ws', secure: true, rejectUnauthorized: false });

socket.on('connect', () => {
  console.log('Connected to WebSocket server!');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server.');
});

socket.on('connect_error', (err) => {
  console.error('Connection error:', err.message);
});
