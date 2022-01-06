import React, { createContext, useState, useContext, useEffect } from 'react'
const ButtonContext = createContext()
const ButtonProvider = ButtonContext.Provider
import {startOfWeek} from 'date-fns'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'
 
function ButtonStateProvider({ children }) {
  
  const [isToday, setIsToday] = useState([])
 const handleIt = () => {
     setIsToday(prev => prev === isToday && !prev)
 }
 console.log(handleIt)
 
  return (
    <ButtonProvider
      value={{
      
        isToday,
        setIsToday,
    handleIt
      }}
    >
     
          {children}
 
    </ButtonProvider>
  )
}

function useButton() {
  const all = useContext(ButtonContext)
  return all
}

export { ButtonStateProvider, ButtonContext, useButton}
