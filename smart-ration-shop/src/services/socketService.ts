import { io, Socket } from 'socket.io-client';
import { SOCKET_URL } from '../constants';

let socket: Socket | null = null;

export const socketService = {
  connect(token: string) {
    if (socket?.connected) return socket;

    socket = io(SOCKET_URL, {
      auth: { token },
      transports: ['websocket'],
    });

    return socket;
  },

  disconnect() {
    socket?.disconnect();
    socket = null;
  },

  on(event: string, callback: (...args: unknown[]) => void) {
    socket?.on(event, callback);
  },

  off(event: string, callback?: (...args: unknown[]) => void) {
    socket?.off(event, callback);
  },

  emit(event: string, data?: unknown) {
    socket?.emit(event, data);
  },
};
