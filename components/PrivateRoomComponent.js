import React, {useContext, useEffect, useRef} from 'react'
import VideoState from './contexts/PrivatePeerSocket'
import styled from 'styled-components'
import { usePeerSocket } from './contexts/PrivatePeerSocket'

const Wrap = styled.section`
   .video-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, 300px);
      grid-auto-rows: 300px;
    }
    

`
const Grid = styled.div`
.user_me {
display: flex;
width: 100%;
height: 100vh;
}
    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
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
    name,
    setName,
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
  } = useContext(VideoState);

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
            <button  >Disconnect</button>
        </Wrap>
    )
}

export default PrivateRoomComponent;
