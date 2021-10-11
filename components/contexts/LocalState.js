import { createContext, useState, useContext, useEffect } from 'react'
const LocalStateContext = createContext()
const LocalStateProvider = LocalStateContext.Provider
import {startOfWeek} from 'date-fns'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'

const STATUS_MUTATION = gql`
  mutation STATUS_MUTATION($id: ID!, $status: String!) {
    updateItem(id: $id, data: { status: $status }) {
      id
      status
    }
  }
`
function ToastStateProvider({ children }) {
  
  const [imgSrc, setImgSrc] = useState([])
   const [isToday, setIsToday] = useState('today')

  const [triggerTime, setTriggerTime] = useState(false)
  const [isSelected, setIsSelected] = useState('today')
  const weekStarts = startOfWeek(new Date(), {
    weekStartsOn: 0,
  })
  const [updateItem, { loading, error }] = useMutation(STATUS_MUTATION)

 

  const updateStatus = async (id, name) => {  
    console.log(id,  name)
    await updateItem({
      variables: { id: id, status: name } }, {
      update(cache, {data: { updateItem}}) {
        cache.modify({
          id: updateItem.id,
          fields: {
           status(cachedStatus) {
             if(cachedStatus !== name) {
             return name
            }
            return cachedStatus
           },
          },
        })
      }
     } )
  }
    
  const handleIt = (buttonName) => {
     setIsToday(buttonName)
 }

      
  const handleClick = () => {
    if (imgSrc.length >= 5) {
      return
    }
    if (!triggerTime) {
      setTriggerTime(true)
    }
    return
  }

  return (
    <LocalStateProvider
      value={{
        loading,
        isSelected,
        isToday,
        handleIt,
        setIsSelected,
        updateStatus,
        imgSrc,
        triggerTime,
        setImgSrc,
        setTriggerTime,
        handleClick,
      }}
    >
     
          {children}
 
    </LocalStateProvider>
  )
}

function useToast() {
  const all = useContext(LocalStateContext)
  return all
}

export { ToastStateProvider, LocalStateContext, useToast }
