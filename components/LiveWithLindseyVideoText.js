import React from 'react'
import styled from 'styled-components'

const Wrap = styled.div`
 background: black;

      width: 100%;
    margin: 0 auto;
    position: relative;
    max-width: 1200px;
  }
 
  
  
  
  video { 
  width: 400px;    height: auto;
    border-radius: 25px;
  }
  
  svg { 
    width: 100%;
    position:absolute;
    top: 0;
    left: 0; 
    height: 100%;
  }
  svg text {
    font-family: 'Bison';
 
    text-transform: uppercase;
    font-size:22px;
  }
  svg rect {
    fill: white;
  }
  svg > rect {
      -webkit-mask: url(#mask);
      mask: url(#mask);
  }
`
const Video = styled.div`
  height: 455px;
  position: absolute;
  /* grid-column: 1; */
  transform: translate(250px, -600px) rotate(45deg);
  border-radius: 25px;
  width: 220px;
  overflow: hidden;
  video {
    height: 450px;
    border-radius: 25px;
  }
`
const LiveWithLindseyVideoText = () => (
  <Wrap>
 
   
                <video
          autoPlay
          muted
          playsInline
          loop
          style={{
            transition: 'opacity, 2s ease-in-out',
          }}
        >
          <source src="../static/img/lindseymashup.mp4" type="video/mp4" />
        </video>
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 285 80" preserveAspectRatio="xMidYMid slice">
        <defs>
        <mask id="mask" x="0" y="0" width="100%" height="100%" >
          <rect x="0" y="0" width="100%" height="100%" />
        <text x="72"  y="50">LIVE WITH</text>
          </mask>
      </defs>
     <rect x="0" y="0" width="100%" height="100%" />
      </svg>
  </Wrap>
)

export default LiveWithLindseyVideoText


 
   
     