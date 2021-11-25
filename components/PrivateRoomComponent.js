import React, { useState, useRef} from 'react'
import { motion } from "framer-motion";
import Options from './Options'
import Loader from './Loader'
import Error from './ErrorMessage'
import SickButton  from './styles/SickButton'
import styled from 'styled-components'
import  {usePeerSocket}  from './contexts/PrivatePeerSocket'
import {useQuery} from '@apollo/client'
import gql from 'graphql-tag'

const PRIVATE_AUTH_QUERY = gql`
  query PRIVATE_AUTH_QUERY($id: ID!) {
    privateAuth(id: $id) {
     message
    }
  }
`
const Wrap = styled(motion.div)`
position: relative;
display: flex;
 overflow: hidden;
 height: calc(100vh - 60px);
 width: 100%;
   .video-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, 300px);
      grid-auto-rows: 300px;
      position: absolute;   
    }
        .opt-wrap {
      position: fixed;
display: flex;
width: 100%;
height: calc(100vh - 60px);
bottom: 100px;
margin: 0 auto;
    justify-content: center;
    align-items: flex-end;}

 
.user_me {
display: flex;  

width: 100%;
height: calc(100vh - 60px);
-webkit-transform: scaleX(-1);
  transform: scaleX(-1); 
}
    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: absolute;
 
    }
.user_other {
  display: flex;
  position: relative;
  height: 150px;
  width: auto;
  background: lightgray;
  z-index: 8888888;
  border-radius: 5px;
cursor: grab;
 
}
`
const IconBar = styled.div`
position: fixed;
bottom: 10px;
left: 10px;
display: flex;
.icons {
  display: flex;
  margin: 5px;
  justify-content: center;
  align-items: center;
  background: #f8b0b0;
  border-radius: 50%;
  height: 30px;
 
  cursor: pointer;
  width: 30px;
  &:hover {
    opacity: .5;
  }
}
img {
  height: 20px;
  width: 20px;
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
const PrivateRoomComponent = ({isAdmin, classId}) => {
  const constraintsRef = useRef(null)

  const [isModalVisible, setIsModalVisible] = useState(false)

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
    setIsModalVisible(false)
    leaveCall1()
    window.location.reload()
  }

  const { data, loading, error } = useQuery(PRIVATE_AUTH_QUERY, {
    variables: { id: classId },
  })

  if (loading) return <Loader />
  if (error) return <Error error={error} />
if (!data === null) return null
    return (

        <Wrap>
     
      
       {stream &&
           
           <motion.video   
           drag             
           whileHover={{ opacity: 1 }}
           whileTap={{
               opacity: 1,
               scale: 1.05,
               boxShadow: '0px 5px 8px rgba(20,20,20,.6)',
               cursor: 'grabbing' 
           }}
           whileDrag={{ scale: 1.1, boxShadow: '0px 10px 16px rgba(20,20,20,.6)' }}
           transition={{ duration: 0.6 }}  dragConstraints={{ top: 0, right: 500, bottom: 600, left: 0 }}      dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
           dragElastic={0.3}
           playsInline muted ref={myVideo} autoPlay className="user_other" />
       }        
      
     
      {callAccepted && !callEnded && (
      <video  playsInline ref={userVideo} autoPlay  className="user_me"  
      />
      
      )}
 
    {isAdmin && <div className="opt-wrap">   <Options/></div>}

    {call.isReceivingCall && !callAccepted && (
      
         
   
      <CallingNow isModalVisible={isModalVisible} isReceivingCall={call.isReceivingCall} callAccepted={callAccepted} style={{ display: "flex", justifyContent: "space-around" }}>
     <p>   You Have an Invite to Join, Please Accept to Continue!</p>
   <div>
        <SickButton
    
      
     
      
          onClick={() => {
            answerCall()
            setIsModalVisible(false)
          }}
       
        >
          Accept
        </SickButton>
        <SickButton

          onClick={() => {
              handleCancel()
 
          
          }}
       
        >
          Decline
        </SickButton>
     </div>
      </CallingNow>
    
 
  )}
  <IconBar>
        <div className="icons"
                onClick={() => handleScreenSharing()} title="share your screen">
                <img src="../static/img/share_screen.svg" alt="share screen" />
              </div>
               <div className="icons"
                onClick={() => updateVideo()}  title="toggle your camera on/off">
                {myVdoStatus ? (
                <img src="../static/img/videocamera.svg" alt="toggle camera off" />
              ) : (
         <img src="../static/img/xxx.svg" alt="toggle camera back on" />
              )}
                
              </div>
               <div className="icons"
                onClick={() => updateMic()} title="toggle your microphone on/off">
              
                            {myMicStatus ? (
    <img src="../static/img/microphone.svg" alt="toggle microphone" />
              ) : (
         <img src="../static/img/xxx.svg" alt="toggle camera back on" />
              )}
                
              </div>
              </IconBar>
        </Wrap>
    )
}

export default PrivateRoomComponent
