import React from 'react'
import { format, startOfWeek, endOfWeek } from 'date-fns'
import styled from 'styled-components'

const StyleMePritay = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 100;
  grid-template-rows: 1fr;
  width: 100%;
  max-height: 730px;

  .left {
    justify-content: center;
    grid-row: 1;
    grid-column: 2;
 
    padding:  0px 0 0 0px;
  }
  .right {
    grid-column: 1/3;

 
  justify-content: flex-start;
    grid-row: 1;
    height: 700px;
    background: url('../static/img/phonewithvideotestfinal2.png')  -190px bottom;
    background-repeat: no-repeat;
    background-size: auto 700px;
    /* transform:   rotate(-23deg); */
    z-index: 2150;
    position: relative;
 }
 .main-text {
   width: 100%;
   height: 100%;
   display: flex;
   justify-content: center;  font-family: 'Comfortaa';
   max-width: 550px;
   font-size:18px;
   line-height:20px;  
   color: slategray;
   flex-flow: column;
   align-items: flex-start;
  
 }
  h2 {
    font-family: 'Bison';
    color: slategray;
    letter-spacing: 2px;
    line-height: 26px;
    font-size: 26px;
    margin-bottom: 0px;
    text-align: center;
  }
  p {
    max-width: 550px;
  }
  span {
    font-family: 'Bison';
    font-size: 34px;
    letter-spacing: 2px;
    -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
    background-image: linear-gradient(195deg, #f8b0b0, #ffd7d4,  #f8b0b0);
    background-clip: text;
  }
`
const Video = styled.div`
  height: 440px;
  position: absolute;
  /* grid-column: 1; */
  transform: translate(205px, -620px) rotate(23.5deg);
  border-radius: 25px;
  width: 215px;
  overflow: hidden;
  video {
    height: 450px;
    border-radius: 25px;
  }
`

 
export default function BounceBars() {

  const iconColor = '#f8b0b0'
  return (
    <>
      <StyleMePritay className="white-plain py-5">
        <div className="left">
         <div className="main-text">
           <h2>Online Workouts for <span>All Levels</span> of fitness</h2>
         <p> 
            From Low Impact, 
            to Strength Training, to High Intensity
              <br/><br/>
            Be prepared to gain strength &amp; confidence, 
            connect with like-minded women,
             and leave every class feeling challenged, 
             accomplished, and toned in all the right places.</p>
<img width="400" style={{transform: 'translate(50px, 10px)'}} src="../static/img/readysetsweat.svg" />            
             </div>

        </div>

        <div className="right phones"></div>
      </StyleMePritay>
      <Video>
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
      </Video>
    </>
  )
}
