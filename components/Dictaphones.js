import React, { useEffect, useState } from 'react'
import DictaphoneWidgetA from './DictaphoneWidgetA'
import SpeechRecognition from 'react-speech-recognition'

export default function Dictaphone({
  handleClick,
  // updateStatus,
  // active,
  // status,
}) {
  const [showFirstWidget, setShowFirstWidget] = useState(true)

  const listenContinuously = () =>
    SpeechRecognition.startListening({
      continuous: true,
      language: 'en-US',
    })
  useEffect(() => {
    listenContinuously()
    return () => SpeechRecognition.abortListening()
  }, [])
  return (
    <div>
      {showFirstWidget && (
        <DictaphoneWidgetA
          // updateStatus={updateStatus}
          // active={active}
          // status={status}
          handleClick={handleClick}
        />
      )}
    </div>
  )
}
