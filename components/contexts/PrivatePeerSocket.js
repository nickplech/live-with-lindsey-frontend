import React, { useContext, createContext, useState, useEffect, useRef } from "react";
import io  from "socket.io-client";
import Peer from "simple-peer";
 import Error from '../ErrorMessage'
import Router from 'next/router'
const PeerContext = createContext();

export  function usePeerSocket() {
  return useContext(PeerContext)
  
}


 export function PeerSocketProvider({name, isAdmin, classId, userId, children }) {
  const [peerSocket, setPeerSocket] = useState()
  const [callAccepted, setCallAccepted] = useState(false)
  const [callEnded, setCallEnded] = useState(false)
  const [stream, setStream] = useState()
  const [otherClientId, setOtherClientId] = useState('')
  const [yourName, setYourName] = useState(name)
  const [call, setCall] = useState({})
  const [me, setMe] = useState("")
  const [userName, setUserName] = useState("")
  const [otherUser, setOtherUser] = useState("")
  const [myVdoStatus, setMyVdoStatus] = useState(true)
  const [userVdoStatus, setUserVdoStatus] = useState()
  const [myMicStatus, setMyMicStatus] = useState(true)
  const [userMicStatus, setUserMicStatus] = useState()
  const [readyToMakeTheCallFromAdmin, setReadyToMakeTheCallFromAdmin] = useState('')
  const [screenShare, setScreenShare] = useState(false)

  const myVideo = useRef()
  const userVideo = useRef()
  const connectionRef = useRef(null)
  const screenTrackRef = useRef()

    useEffect(() => {
      const newPeerSocket = io(`http://localhost:3001/privateclass`, {
        withCredentials: true,
 
      })
      setPeerSocket(newPeerSocket)
      console.log('peer sockeeeeeeee')
      return () => {
       
        leaveCall()
        newPeerSocket.close()
      }
    }, [classId, userId ])

  useEffect(() => {
    if(!peerSocket) return
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream)
        myVideo.current.srcObject = currentStream
      })

   
    peerSocket.on("me", (id) => setMe(id))
      
    peerSocket.on("endCall", () => {
      window.location.reload()
    })
  if (isAdmin) {
        peerSocket.emit("readyToGoIn", (me))
        
  }
  if (!isAdmin) {
    peerSocket.emit("readyToMakeTheCallFromAdmin", (me))
   
}
peerSocket.on('me', (id) => setOtherClientId(id))
peerSocket.on('readyToMakeTheCallFromAdminOutBound', (id) => setReadyToMakeTheCallFromAdmin(id))
 
    peerSocket.on("updateUserMedia", ({ type, currentMediaStatus }) => {
      if (currentMediaStatus !== null || currentMediaStatus !== []) {
        switch (type) {
          case "video":
            setUserVdoStatus(currentMediaStatus)
            break
          case "mic":
            setUserMicStatus(currentMediaStatus)
            break;
          default:
            setUserMicStatus(currentMediaStatus[0])
            setUserVdoStatus(currentMediaStatus[1])
            break
        }
      }
    })

    peerSocket.on("callUser", ({ from, yourName: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, yourName: callerName, signal })
    })


  }, [peerSocket, me])

//  useEffect(()=> {
//    if(!peerSocket) return
//    peerSocket.on('readyToGoOut', (clientVideoId) => setOtherClientId(clientVideoId))
//  },[peerSocket, me])
console.log(otherClientId)
console.log(readyToMakeTheCallFromAdmin)
  const answerCall = () => {
    setCallAccepted(true)
    setOtherUser(call.from)
    const peer = new Peer({ initiator: false, trickle: false, stream })

    peer.on("signal", (data) => {
      peerSocket.emit("answerCall", {
        signal: data,
        to: call.from,
        userName:yourName,
        type: "both",
        myMediaStatus: [myMicStatus, myVdoStatus],
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal)

    connectionRef.current = peer
    console.log(connectionRef.current)
  }

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream })
    setOtherUser(id)
    peer.on("signal", (data) => {
      peerSocket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
       yourName,
      })
    })

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    })

    peerSocket.on("callAccepted", ({ signal, userName }) => {
      setCallAccepted(true)
      setUserName(userName)
      peer.signal(signal)
      peerSocket.emit("updateMyMedia", {
        type: "both",
        currentMediaStatus: [myMicStatus, myVdoStatus],
      })
    })

    connectionRef.current = peer;
    console.log(connectionRef.current)
  }

  const updateVideo = () => {
    setMyVdoStatus((currentStatus) => {
      peerSocket.emit("updateMyMedia", {
        type: "video",
        currentMediaStatus: !currentStatus,
      })
      stream.getVideoTracks()[0].enabled = !currentStatus
      return !currentStatus
    })
  }

  const updateMic = () => {
    setMyMicStatus((currentStatus) => {
      peerSocket.emit("updateMyMedia", {
        type: "mic",
        currentMediaStatus: !currentStatus,
      })
      stream.getAudioTracks()[0].enabled = !currentStatus
      return !currentStatus
    })
  }

  
    //SCREEN SHARING 
    const handleScreenSharing = () => {

      if(!myVdoStatus){
        return <Error error={"Turn on your video to share the content"}
      />}
    
      if (!screenShare) {
        navigator.mediaDevices
          .getDisplayMedia({ cursor: true })
          .then((currentStream) => {
            const screenTrack = currentStream.getTracks()[0]

  
              // replaceTrack (oldTrack, newTrack, oldStream)
              connectionRef.current.replaceTrack(
                connectionRef.current.streams[0]
                  .getTracks()
                  .find((track) => track.kind === 'video'),
                screenTrack,
                stream
              )
  
            // Listen click end
            screenTrack.onended = () => {
              connectionRef.current.replaceTrack(
                  screenTrack,
                  connectionRef.current.streams[0]
                    .getTracks()
                    .find((track) => track.kind === 'video'),
                  stream
                )

              myVideo.current.srcObject = stream;
              setScreenShare(false)
            }
  
            myVideo.current.srcObject = currentStream
            screenTrackRef.current = screenTrack
            setScreenShare(true)
          }).catch((error) => {
            console.log("No stream for sharing")
          })
      } else {
        screenTrackRef.current.onended()
      }
    }

     //full screen
     const fullScreen = (e) => {
      const elem = e.target
  
      if (elem.requestFullscreen) {
        elem.requestFullscreen()
      } else if (elem.mozRequestFullScreen) {

        elem.mozRequestFullScreen()
      } else if (elem.webkitRequestFullscreen) {
       
        elem.webkitRequestFullscreen()
      } else if (elem.msRequestFullscreen) {
   
        elem.msRequestFullscreen()
      }
    };

  const leaveCall = () => {
    setCallEnded(true)

    connectionRef.current.destroy()
    peerSocket.emit("endCall", { id: otherUser })
   
  Router.push({
        pathname: '/',
      })
 
 
  }
  const leaveCall2 = () => {
    if(isAdmin) return
    setCallEnded(true)
if(connectionRef.current !== null) {
   connectionRef.current.destroy()

}
    // peerSocket.emit("endCall", { id: otherUser })
    // window.location.reload()
  }

  const leaveCall1 = () => {
    if(isAdmin) return
    peerSocket.emit("endCall", { id: otherUser })
  }

  return (
    <PeerContext.Provider
      value={{
        peerSocket,
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
        readyToMakeTheCallFromAdmin,
        otherClientId,
        setOtherUser,
        leaveCall1,
        otherClientId,
        userName,
        myVdoStatus,
        setMyVdoStatus,
        userVdoStatus,
        setUserVdoStatus,
        updateVideo,
        myMicStatus,
        userMicStatus,
        updateMic,
        screenShare,
        handleScreenSharing,
        fullScreen
      }}
    >
      {children}
    </PeerContext.Provider>
  );
};


 
