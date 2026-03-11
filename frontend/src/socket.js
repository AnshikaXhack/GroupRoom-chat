// src/socket.js
import { io } from "socket.io-client";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const socket = io(BACKEND_URL, {
  transports: ["websocket"], // force WebSocket to avoid polling CORS issues
  withCredentials: true,
});