import { useEffect } from 'react';
import { socketService } from '../services/socketService';
import { useAuth } from '../context/AuthContext';

export function useSocket(eventHandlers: Record<string, (...args: unknown[]) => void>) {
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.token) return;

    const socket = socketService.connect(user.token);
    Object.entries(eventHandlers).forEach(([event, handler]) => {
      socketService.on(event, handler);
    });

    return () => {
      Object.entries(eventHandlers).forEach(([event, handler]) => {
        socketService.off(event, handler);
      });
      socketService.disconnect();
    };
  }, [user?.token, eventHandlers]);
}
