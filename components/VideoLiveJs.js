import React from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

export const VideoLiveJs = ( props ) => {

  const videoRef = React.useRef(null);
  const { options } = props;
 
  const VideoHtml = ( props ) => (
    <div data-vjs-player>
      <video ref={videoRef} poster="../static/img/classbackgrounds/backsplashfinal/standby.jpg" className="video-js vjs-big-play-centered" />
    </div>
  );

  React.useEffect( () => {
    const videoElement = videoRef.current;
    let player;
    if( videoElement ) {
      player = videojs( videoElement, options, () => {
        console.log("player is ready");
      });
    }
    return () => {
      if( player ) {
        player.dispose();
      }
    }
  }, [options]);

  return (<VideoHtml />);
}
export default VideoLiveJs;