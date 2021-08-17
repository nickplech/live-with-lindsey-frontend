import React, { useState, useEffect } from 'react'
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'
const Dictaphone = ({ commands }) => {
  const [transcribing, setTranscribing] = useState(false)
  const [clearTranscriptOnListen, setClearTranscriptOnListen] = useState(true)
  const toggleTranscribing = () => setTranscribing(!transcribing)
  const toggleClearTranscriptOnListen = () =>
    setClearTranscriptOnListen(!clearTranscriptOnListen)
  const {
    transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({ transcribing, clearTranscriptOnListen, commands })
  useEffect(() => {
    if (interimTranscript !== '') {
      console.log('Got interim result:', interimTranscript)
    }
    if (finalTranscript !== '') {
      console.log('Got final result:', finalTranscript)
    }
  }, [interimTranscript, finalTranscript])

  if (!browserSupportsSpeechRecognition) {
    return <span>No browser support</span>
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span>listening: {listening ? 'on' : 'off'}</span>
      <span>transcribing: {transcribing ? 'on' : 'off'}</span>

      <button onClick={toggleTranscribing}>Toggle transcribing</button>

      <span>{transcript}</span>
    </div>
  )
}

export default Dictaphone
