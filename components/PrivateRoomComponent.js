import React, { useState, useRef} from 'react'
import { motion } from "framer-motion";
import Options from './Options'
import SickButton  from './styles/SickButton'
import styled from 'styled-components'
import  {usePeerSocket}  from './contexts/PrivatePeerSocket'

const Wrap = styled(motion.div)`
position: relative;
display: flex;
 
   .video-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, 300px);
      grid-auto-rows: 300px;
      position: absolute;   
    }
        .opt-wrap {
      position: relative;
display: flex;
width: 100%;
height: calc(100vh - 60px);
bottom: 100px;
margin: 0 auto;
    justify-content: center;
    align-items: flex-end;}

`
const Grid = styled.div`
.user_me {
display: flex;
width: 100%;
height: calc(100vh - 60px);
}
    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: absolute;
      -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
    }
.user_other {
  display: flex;
  position: absolute;
  height: 150px;
  width: auto;
  background: lightgray;
  z-index: 8888888;
  border-radius: 5px;
cursor: grab;
-webkit-transform: scaleX(-1);
  transform: scaleX(-1); 
}
`


const CallingNow = styled.div`
background: rgba(245,245,245,.8);
position: fixed;
min-height: 100px;
display: flex;
flex-flow: column;
line-height: 10px;
justify-content: center;
justify-self: center;
align-self: center;
font-size: 22px;
align-items: center;
margin: 0 auto;
text-align: center;
width: 100%;

button {
    margin: 5px;
}
`
const PrivateRoomComponent = ({isAdmin}) => {
  const constraintsRef = useRef(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  // const { me, callAccepted, myVideo, userVideo, callEnded, stream, call} = usePeerSocket
  const {
    call,
    callAccepted,
    myVideo,
    userVideo,
    stream,
    yourName,
    setYourName,
    callEnded,
    me,
    callUser,
    leaveCall,
    leaveCall1,
    answerCall,
    // sendMsg: sendMsgFunc,
    // msgRcv,
    // chat,
    // setChat,
    userName,
    myVdoStatus,
    screenShare,
    fullScreen,
    handleScreenSharing,
    userVdoStatus,
    updateVideo,
    myMicStatus,
    userMicStatus,
    updateMic,
  } = usePeerSocket()
  const handleCancel = () => {
    setIsModalVisible(false);
    leaveCall1();
    window.location.reload();
  };
    return (
        <Wrap ref={constraintsRef}>
            <Grid  >
     
      
       {stream &&
           
            <video playsInline muted ref={myVideo} autoPlay className="user_me" />
       }        
      
     
      {callAccepted && !callEnded && (
      <motion.video style={{transform: 'scaleX(-1)'}} playsInline ref={userVideo} autoPlay className="user_other" drag
      dragConstraints={constraintsRef} />
      
      )}
    </Grid>
    {isAdmin && <div className="opt-wrap">   <Options/></div>}

    {call.isReceivingCall && !callAccepted && (
      
         
   
      <CallingNow isModalVisible={isModalVisible} isReceivingCall={call.isReceivingCall} callAccepted={callAccepted} style={{ display: "flex", justifyContent: "space-around" }}>
     <p>   You Have an Invite to Join, Please Accept to Continue!</p>
   <div>
        <SickButton
    
      
     
      
          onClick={() => {
            answerCall();
            setIsModalVisible(false)
          }}
       
        >
          Accept
        </SickButton>
        <SickButton

          onClick={() => {
            setIsModalVisible(false)
            handleCancel()
          }}
       
        >
          Decline
        </SickButton>
     </div>
      </CallingNow>
    
 
)}
       
        </Wrap>
    )
}

export default PrivateRoomComponent;
