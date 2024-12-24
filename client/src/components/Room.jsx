import React, { useCallback, useEffect, useState } from 'react'
import { useSocketContext } from '../hook/useSocketContext'
import { usePeer } from '../context/Peercontext'
import ReactPLayer from 'react-player'
import ReactPlayer from 'react-player'

const Room = () => {
  const [mystream, setmystream] = useState(null)
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

  const handleCallAccept = useCallback(async (data) => {
    const { ans } = data;
    await setRemoteAns(ans);
    console.log("Call got accepted", ans)
  }, [setRemoteAns])

  const getUserMediaStream = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true })
    setmystream(stream)
  }, [])

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


  useEffect(() => {
    getUserMediaStream()
  }, [])
  return (
    <>
      <div>Room</div>
      <div className='flex flex-wrap items-center gap-4 justify-center flex-col'>
      <ReactPlayer url={mystream} playing />
      </div>
    </>
  )
}

export default Room