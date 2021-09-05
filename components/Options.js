import React, { useState, useContext, useEffect, useRef } from "react";

// import * as classes from "./Options.module.css";
// import { CopyToClipboard } from "react-copy-to-clipboard";
import {usePeerSocket} from "./contexts/PrivatePeerSocket";
 import SickButton  from "./styles/SickButton";
 import { toast } from 'react-toastify'
 import styled from 'styled-components'
// import {
//   TwitterIcon,
//   TwitterShareButton,
//   WhatsappShareButton,
//   WhatsappIcon,
//   FacebookIcon,
//   FacebookShareButton,
// } from "react-share";
// import {
//   UserOutlined,
//   CopyOutlined,
//   InfoCircleOutlined,
//   PhoneOutlined,
// } from "@ant-design/icons";
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
      peerSocket,
    call,
    callAccepted,
    otherClientId,
    myVideo,
    userVideo,
    stream,
    yourName,
    setYourName,
    callEnded,
    me,
    callUser,
    leaveCall,
    answerCall,
    otherUser,
    setOtherUser,
    leaveCall1,
  } = usePeerSocket();


  const handleCancel = () => {
    setIsModalVisible(false);
    leaveCall1();
    window.location.reload();
  };
  useEffect(() => {
   
    if (call.isReceivingCall) {
           console.log('call it!')
      setIsModalVisible(true);
      setOtherUser(call.from);
  
    } else setIsModalVisible(false);
  }, [call.isReceivingCall]);


  return (
      <>
        {callAccepted && !callEnded ? (
       null
        ) : (
    <Wrap >
 
 
           
            {/* <WhatsappShareButton
              url={`https://video-chat-mihir.vercel.app/`}
              title={`Join this meeting with the given code "${me}"\n`}
              separator="Link: "
              className={classes.share_icon}
            >
              <WhatsappIcon size={26} round />
            </WhatsappShareButton>
            <FacebookShareButton
              url={`https://video-chat-mihir.vercel.app/`}
              title={`Join this meeting with the given code "${me}"\n`}
              className={classes.share_icon}
            >
              <FacebookIcon size={26} round />
            </FacebookShareButton>
            <TwitterShareButton
              url={`https://video-chat-mihir.vercel.app/`}
              title={`Join this meeting with the given code  "${me}"\n`}
              className={classes.share_icon}
            >
              <TwitterIcon size={26} round className={classes.share_border} />
            </TwitterShareButton> */}
      
   
       

      
            <>
            <p style={{fontSize: '22px ', lineHeight: '22px '}}>{otherClientId ? 'Both Parties Have Arrived, You May Begin Your Video Chat!' : 'Please Wait for The Other Party to Enter the Studio'}</p>
          <SickButton
            type="primary"
            disabled={!otherClientId}
            onClick={() => {
        callUser(otherClientId && otherClientId);
           
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

export default Options;