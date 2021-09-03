import React, { useEffect, useRef} from 'react'
import Options from './Options'
import styled from 'styled-components'
import  {usePeerSocket}  from './contexts/PrivatePeerSocket'

const Wrap = styled.section`
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
    
    }

`
const PrivateRoomComponent = (props) => {
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
    answerCall,
    sendMsg: sendMsgFunc,
    msgRcv,
    chat,
    setChat,
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

    return (
        <Wrap>
            <Grid>
     
      
       {stream &&
           
            <video playsInline muted ref={myVideo} autoPlay className="user_me" />
       }        
      
     
      {callAccepted && !callEnded && (
      <video playsInline ref={userVideo} autoPlay className="user_other" />
      
      )}
    </Grid>
    <div className="opt-wrap">   <Options/></div>
       
        </Wrap>
    )
}

export default PrivateRoomComponent;
