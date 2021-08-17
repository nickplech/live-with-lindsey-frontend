import React, { useContext, useState, useEffect } from 'react'
import io from 'socket.io-client'

const UserSocketContext = React.createContext()

export function useUserSocket() {
  return useContext(UserSocketContext)
}

export function UserSocketProvider({  userId, children }) {
  const [userSocket, setUserSocket] = useState()

 
  useEffect(() => {
    const newUserSocket = io(`http://localhost:3001`, {
      withCredentials: true,
   
    })
    setUserSocket(newUserSocket)
    console.log('user sockee')
    return () => newUserSocket.close()
  }, [userId])
  return (
    <UserSocketContext.Provider value={userSocket}>
      {children}
    </UserSocketContext.Provider>
  )
}
