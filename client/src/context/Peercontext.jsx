import React, { createContext, useContext, useMemo } from 'react'

export const PeerContext = createContext();


export const PeerContextProvider = ({children}) => {


    const peer = useMemo(() =>{
        return new RTCPeerConnection({
            iceServers:[
                {
                    urls:[
                        "stun:stun.l.google.com:19302",
                        "stun:global.stun.twilio.com:3478"
                    ]
                }
            ]
        })
    }, [])

    const createOffer = async()=>{
        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);
        return offer;
    }

    const createAnswer = async(offer)=>{
        await peer.setRemoteDescription(offer);
        const answer = peer.createAnswer();
        await peer.setLocalDescription(answer);
        return answer
    }


    const setRemoteAns = async(ans) => {
        await peer.setRemoteDescription(ans);
    }

    return<PeerContext.Provider value={{peer, createOffer, createAnswer, setRemoteAns}}>
        {children}
    </PeerContext.Provider>
}


export const usePeer = () =>{
    const usePeerContext = useContext(PeerContext)
    return {peer : usePeerContext.peer, createOffer : usePeerContext.createOffer, createAnswer : usePeerContext.createAnswer, 
        setRemoteAns : usePeerContext.setRemoteAns
    }
}


