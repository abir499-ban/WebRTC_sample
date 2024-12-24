import React, { useCallback, useEffect } from 'react'
import { useSocketContext } from '../hook/useSocketContext'
import { usePeer } from '../context/Peercontext'

const Room = () => {
  const { socket } = useSocketContext();
  const { peer, createOffer, createAnswer, setRemoteAns } = usePeer();

  const handleUserJoin = useCallback(
    async (data) => {
      const { emailID } = data;
      console.log("User joined ", emailID);
      const offer = await createOffer();
      socket.emit('call_user', { emailID, offer })
    },
    [createOffer, socket]
  )

  const handleincomingCall = useCallback(async ({ from, offer }) => {
    console.log("incoming call from ", from, offer)
    const ans = await createAnswer(offer);
    socket.emit('call_accepted', { emailID: from, ans })
  }, [createAnswer, socket])

  const handleCallAccept = useCallback(async(data) => {
    const {ans} = data;
    await setRemoteAns(ans);
    console.log("Call got accepted", ans)
  }, [setRemoteAns])

  useEffect(() => {
    socket.on('user_joined', handleUserJoin)
    socket.on('incoming_call', handleincomingCall);
    socket.on('call_accepted', handleCallAccept);
    return () => {
      socket.off('user_joined', handleUserJoin);
      socket.off('incoming_call', handleincomingCall)
      socket.off('call_accepted', handleCallAccept);
    }

  }, [handleUserJoin, handleincomingCall, socket, handleCallAccept])
  return (
    <div>Room</div>
  )
}

export default Room