import React, { useContext, useState, useEffect } from 'react'
import io from 'socket.io-client'

const PrivatePeerContext = React.createContext()

export function usePeerSocket() {
  return useContext(PrivatePeerContext)
}

export function PrivatePeerContextProvider({ id, userId, children }) {
  const [peerSocket, setPeerSocket] = useState()

  console.log(peerSocket)

  useEffect(() => {
    const newPeerSocket = io(`http://localhost:3001/privateclass`, {
      withCredentials: true,
      query: { id: id, userId: userId },
    })
    setPeerSocket(newPeerSocket)

    return () => newPeerSocket.close()
  }, [id, userId])
  return (
    <PrivatePeerContext.Provider value={peerSocket}>
      {children}
    </PrivatePeerContext.Provider>
  )
}
