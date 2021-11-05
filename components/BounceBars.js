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
  max-height: 750px;

  .left {
    justify-content: center;
    grid-row: 1;
    grid-column: 2;
    transform: translateY(50px);
    padding: 20px 0 0 0px;
  }
  .right {
    grid-column: 1/3;

 
  justify-content: flex-start;
    grid-row: 1;
    height: 720px;
    background: url('../static/img/phonewithvideotestfinal2.png') -190px bottom;
    background-repeat: no-repeat;
    background-size: auto 720px;

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
   align-items: center;
   transform: translate(0, -50px);
 }
  h2 {
    font-family: 'Bison';
    color: ${props => props.theme.second};
    font-size: 26px;
    margin-bottom: 0px;
  }
  p {
    max-width: 550px;
  }
  span {
    font-family: 'Bison';
    font-size: 22px;
    letter-spacing: 2px;
    -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
    background-image: linear-gradient(195deg, #f8b0b0, #ffd7d4,  #f8b0b0);
    background-clip: text;
  }
`
const Video = styled.div`
  height: 455px;
  position: absolute;
  /* grid-column: 1; */
  transform: translate(225px, -635px) rotate(23.5deg);
  border-radius: 25px;
  width: 220px;
  overflow: hidden;
  video {
    height: 450px;
    border-radius: 25px;
  }
`

const Schedule = styled.div`
  font-family: 'Felix';
  transform: translate(190px, 560px);
  text-transform: uppercase;
  z-index: 0;
  right: 0;

  position: absolute;
  h1 {
    margin: 2px;
    font-size: 36px;
  }
  p {
    margin: 2px;
    transform: translate(-15px, 60px);
    font-family: 'Bison thickoutline';
    font-size: 36px;
    color: ${(props) => props.theme.fourth};
    width: 500px;
  }
  img {
    transform: translate(5px, 0px);
  }
`
export default function BounceBars() {

  const iconColor = '#f8b0b0'
  return (
    <>
      <StyleMePritay className="white-plain py-5">
        <div className="left">
         <div className="main-text">
         <p><span>Get ready to have fun and work hard</span>&mdash;
            my classes range from low impact, 
            to strength training, to high intensity, 
            and cater to all fitness levels. <br/><br/>
            Be prepared to gain strength &amp; confidence, 
            connect with like-minded women,
             and leave every class feeling challenged, 
             accomplished, and toned in all the right places.</p>
<img width="400" style={{transform: 'translate(40px, 10px)'}} src="../static/img/readysetsweat.svg" />            
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
