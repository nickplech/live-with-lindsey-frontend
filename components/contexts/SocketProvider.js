import React, { useContext, useState, useEffect } from 'react'
import io from 'socket.io-client'

const SocketContext = React.createContext()

export function useSocket() {
  return useContext(SocketContext)
}

export function SocketProvider({ id, userId, userName, children }) {
  const [streamSocket, setStreamSocket] = useState()

  console.log(streamSocket)

  useEffect(() => {
    const newStreamSocket = io(`http://localhost:3001/chat`, {
      withCredentials: true,
      query: { id: id, userId: userId, userName: userName },
    })
    setStreamSocket(newStreamSocket)

    return () => newStreamSocket.close()
  }, [id, userId])
  return (
    <SocketContext.Provider value={streamSocket}>
      {children}
    </SocketContext.Provider>
  )
}
