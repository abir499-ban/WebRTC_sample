import React, { createContext, useContext, useMemo } from 'react';
import { io } from 'socket.io-client'

export const Socketcontext = createContext();

export const SocketContextProvider = ({children}) => {
    const socket = useMemo(()=>{
        return io('http://localhost:8000');
      }, [])

    return ( <Socketcontext.Provider value={socket}>
        {children}
    </Socketcontext.Provider>)
}



