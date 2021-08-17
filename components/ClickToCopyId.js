import React, { useRef, useState, useEffect } from 'react'
import HelpModal from './HelpModal'
import { toast } from 'react-toastify'
const CopyToClipElement = ({ text }) => {
  const myRef = useRef(null)
  const [data, setData] = useState(text)
  useEffect(() => setData(text), [text])

  useEffect(() => {
    if (myRef.current && data) {
      myRef.current.select()
      document.execCommand('copy')
      setData(null)
    }
  }, [data, myRef.current])

  return <div>{data && <textarea defaultValue={data} ref={myRef}></textarea>}</div>
}

export default function ClickToCopyId({ id }) {
  const [copyText, setCopyText] = useState('')
  useEffect(() => {
    if (copyText.length > 2) {
      toast(`The StreamId Has Been Copied!`)
    }
    return () => setCopyText('')
  }, [copyText])

  return (
     
      <div
        style={{
          display: 'inline-flex',
     
           marginTop: '20px',
          fontFamily: 'Bison',
          color: 'slategrey',
          fontSize: '20px',
        }}
      >
        <HelpModal />{' '}
        <span style={{marginLeft:'6px', marginRight: '5px'}} >
          {' '}
          StreamId:
        </span>
     
      <span
        style={{
        transform: 'translateY(2px)',
          cursor: 'pointer',
          color: 'grey',
          fontSize: '18px',
        }}
        onClick={() => setCopyText(id)}
      >
        {id}
      </span>

      <CopyToClipElement text={copyText} /> </div>
    
  )
}
