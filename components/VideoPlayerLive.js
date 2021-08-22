 

import React, {useEffect,useRef, useState} from "react"
import Loader from './Loader' 
import videojs from "video.js"
import "video.js/dist/video-js.css"

export const VideoPlayerLive = ({id}) => {
  const options = {
    fluid: true,
    fill: true,
 
    autoplay: true,
    responsive: true,
    controls: true,
    textTrackSettings: false,
    liveui: true,
    errorDisplay: false,
    preload: 'auto',
    notSupportedMessage: 'Sorry, not supported!',
    suppressNotSupportedError: true,
    sources: [
      {
        src: `http://143.110.146.49:8080/hls/${id}.m3u8`,
        type: 'application/x-mpegURL',
      },
    ],
    html5: {
      vhs: {
        enableLowInitialPlaylist: true,
        overrideNative: true,
      },
    },
  }



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
return ( 
<VideoHtml />
  )
}

export default VideoPlayerLive;

  const VideoHtml = ( props ) => {

    const videoRef = React.useRef(null)
 return(

    <div data-vjs-player>
      <video ref={videoRef} poster="../static/img/classbackgrounds/backsplashfinal/standby.jpg"
        ref={videoRef} className="video-js vjs-big-play-button vjs-live vjs-liveui  vjs-big-play-centered" 
  />
    </div>
  )
 } 