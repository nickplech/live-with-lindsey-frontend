import React from "react"
import videojs from "video.js"
import "video.js/dist/video-js.css"
import styled from 'styled-components'

const Live = styled.div`
color: white;
background: red;
opacity: .6;
padding: 2px 6px;
position: absolute;
top: 10px;
line-height: 12px;letter-spacing: 2px;
text-align: center;
z-index:  1000;
left: 10px;
`
export const VideoLiveJs = ( props ) => {

  const videoRef = React.useRef(null)
  const { options } = props
 
  const VideoHtml = (  ) => (
    <>
    <Live>Live</Live>
    <div data-vjs-player>
      <video ref={videoRef} poster="../static/img/classbackgrounds/backsplashfinal/standby.jpg" className="video-js vjs-big-play-centered" />
    </div>
    </>
  )

  React.useEffect( () => {
    const videoElement = videoRef.current
    let player
    if( videoElement ) {
      player = videojs( videoElement, options, () => {
        console.log('player is ready')
      })
    }
    return () => {
      if( player ) {
        player.dispose()
      }
    }
  }, [options])

  return (<VideoHtml />)
}
export default VideoLiveJs