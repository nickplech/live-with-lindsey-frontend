 

import React, {useEffect, useState} from "react"
import Loader from './Loader' 
import videojs from "video.js"
import "video.js/dist/video-js.css"

export const VideoPlayerLive = ( props ) => {

  const videoRef = React.useRef(null)
  const { options } = props

  const VideoHtml = ( props ) => (
     
      <video-js style={{ 
      display: 'flex',
      width: '100%',
        height: '100%',
        gridRow: '1/3',
        gridColumn: 1,
      margin: '0 auto',
      position: 'relative',
      zIndex: 10000}} 
        poster="../static/img/classbackgrounds/backsplashfinal/standby.jpg"
        ref={videoRef} className="video-js vjs-big-play-button vjs-live vjs-liveui  vjs-big-play-centered" 
    ></video-js>   
    
  )


useEffect( () => {
    const videoElement = videoRef.current;
    let player
    let modal
    if( videoElement ) {
      player = videojs( videoElement, options, () => {
        console.log("player is ready")
      });
    }
    return () => {
      if( player ) {
        player.dispose()
      }
    }
  }, [options])


 
return  <VideoHtml />

}
export default VideoPlayerLive;