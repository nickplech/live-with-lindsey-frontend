import React, { useState } from 'react'
import Dictaphone from './Dictaphone'
import { toast } from 'react-toastify'

const DictaphoneWidgetA = ({ status, handleClick }) => {
  const [message, setMessage] = useState('')
  const commands = [
    {
      command: 'Set Live Stream to :condition',
      callback: (condition) => setMessage(`Today, the weather is ${condition}`),
     },
    {
      command: ['take picture', 'take photo', 'cheese'],
      callback: (command) => handleClick(),
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.9,
    },
    {
      command: 'clear',
      callback: ({ resetTranscript }) => resetTranscript(),
      matchInterim: true,
    },
  ]
  return (
    <div>
      <p>{message}</p>
      <Dictaphone commands={commands} />
    </div>
  )
}

export default DictaphoneWidgetA
