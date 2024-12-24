import { useContext } from 'react';
import { Socketcontext } from '../context/Socketcontext';

export const useSocketContext = () => {
  const context = useContext(Socketcontext);
  if (!context) {
    throw new Error("useSocketContext must be used within a SocketContextProvider");
  }
  return { socket: context };
};
