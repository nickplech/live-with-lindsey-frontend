import React, { useState, useContext, useEffect, useRef } from "react";


import {usePeerSocket} from "./contexts/PrivatePeerSocket";
 import SickButton  from "./styles/SickButton";
 import { toast } from 'react-toastify'
 import styled from 'styled-components'
// import {
//   TwitterIcon,
//   TwitterShareButton,
//   EmailShareButton
//   FacebookIcon,
//   FacebookShareButton,
// } from "react-share";
 
 const Wrap = styled.div`
 display: flex;
flex-flow: column;
text-align: center;
 justify-content: center;
 align-items: center;
 border-radius:10px;
 padding: 10px;
 justify-self: center;
 margin: 0 auto;
 background: rgba(245,245,245,1);
 box-shadow: 0 20px 8px -10px rgba(0,0,0,.2);
  position: absolute;     
 width: 95%;
 max-width:300px;
 height: 200px;
 `
 const EndIt = styled.div`
 position: fixed;
 z-index: 99999;
 bottom: 10px;
 right: 10px;
 button {
     background: #f8b0b0;
     opacity: .9;
     color: white;
     padding: 5px 2px;
     border-radius: 5px;
     padding-right: 8px;
     border: none;
    text-align: center;
 
     font-family: 'Bison';
     letter-spacing: 2px;
     font-size: 18px;
 }
 `
const Options = () => {
  const [idToCall, setIdToCall] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const {
    call,
    callAccepted,
    otherClientId,
    readyToMakeTheCallFromAdmin,
    callEnded,
    me,
    callUser,
    leaveCall,
    answerCall,
    otherUser,
    setOtherUser,
    leaveCall1,
  } = usePeerSocket()

  const handleCancel = () => {
    setIsModalVisible(false)
    leaveCall1()
    window.location.reload()
  }
  useEffect(() => {
    if (call.isReceivingCall) {
           console.log('call it!')
      setIsModalVisible(true)
      setOtherUser(call.from)
  
    } else setIsModalVisible(false)
  }, [call.isReceivingCall])
  return (
      <>
        {callAccepted && !callEnded ? (
       null
        ) : (
    <Wrap >
          
            <>
            <p style={{fontSize: '22px ', lineHeight: '22px '}}>{readyToMakeTheCallFromAdmin ? 'Both Parties Have Arrived, You May Begin Your Video Chat!' : 'Please Wait for The Other Party to Enter the Studio'}</p>
          <SickButton
            type="primary"
            disabled={!readyToMakeTheCallFromAdmin}
            onClick={() => {
        callUser(readyToMakeTheCallFromAdmin && readyToMakeTheCallFromAdmin)
            }}
            tabIndex="0"
          >
            Send Chat Invite
          </SickButton>
          </>
     </Wrap>)}
       {callAccepted && !callEnded && 
       <EndIt>
            <button
              onClick={leaveCall}
            >
              &nbsp; End Session
            </button></EndIt>} 
   </>
  )
}

export default Options