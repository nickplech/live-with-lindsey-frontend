import { useState, useEffect } from 'react'
import formatPhoneNumber from './formatPhone'
export default function useForm(initial = {}) {
  const [inputs, setInputs] = useState(initial)
  const [aCleanEmail, setACleanEmail] = useState(false)
  // const initialValues = Object.values(initial).join('')
  // useEffect(() => {
  //   setInputs(initial)
  // },[initialValues])
     console.log(aCleanEmail)
  function handleChange(e) {
    let { value, name, type } = e.target
    if (type === 'number') {
      value = parseInt(value)
    }
    if (type === 'email') {
     const cleanEmail = validateEmail(value)
   
     if(cleanEmail === true) {
       setACleanEmail(cleanEmail)
     }
      }
    
    if (type === 'file') {
      [value] = e.target.files
    }
    if (name === 'cellPhone') {
      formatPhoneNumber(value)
    }
    setInputs({
      ...inputs,
      [name]: value,
    })
  }

  function resetForm() {
    setInputs(initial)
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key]) => [key, '']),
    )
    setInputs(blankState)
  }

  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
    aCleanEmail
  }
}

function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(String(email).toLowerCase())}
