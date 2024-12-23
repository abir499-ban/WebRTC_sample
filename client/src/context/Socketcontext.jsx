import React, { createContext, useContext, useMemo } from 'react';
import { io } from 'socket.io-client'

export const Socketcontext = createContext();

export const SocketContextProvider = ({children}) => {
    const socket = useMemo(()=> io({
        host: 'localhost',
        port : 3001
    }))

    return ( <Socketcontext.Provider value={socket}>
        {children}
    </Socketcontext.Provider>)
}


