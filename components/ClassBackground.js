import React from 'react'
import 'video.js/dist/video-js.css'
import CountDownTimer from './CountDownTimer'
import VideoSignUp from './VideoSignUp'
import styled from 'styled-components'
import ShareButtons from './ShareButtons'
const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
 
 width: 100%;
`
const Title = styled.img`
  background: transparent;
  position: absolute;
  z-index: 15000;
  margin: 0 auto;
  transform: translateY(-50px);
  width: 270px;
  @media (max-width: 992px) {
    width: 190px;
    transform: translateY(-40px);
  }
`

const BackgroundPic = styled.img`
//background: url('../static/img/classbackgrounds/backsplashfinal/${props => props.name}.jpg') center center no-repeat;
object-fit: cover;
object-position: bottom;
height: 100%;
width: 100%;
position: relative;
`
function ClassBackground(props) {
  const cleanName = props.name.toLowerCase().replace(/\s/g, '')
  return (
    <Background>
    
      <VideoPlayer name={cleanName}  />
      <Title src="../static/img/countdown2live.svg" alt="countdown to live" />
      <CountDownTimer status={props.status} date={props.date} />
      <VideoSignUp owner={props.owner} classId={props.classId} />
    </Background>
  )
}

export default ClassBackground

const Overlay = styled.div`
 
  
  &:before {
    content: '';
    height: 100%;
    width: 100%;
    display: flex;
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    z-index: 1000;
  }
`
 function VideoPlayer({name}) {

    return (
      <Overlay style={{ display: 'flex', width: '100%', height: '100%', position: 'relative' }}>
          <BackgroundPic src={`../static/img/classbackgrounds/backsplashfinal/${name}.jpg`}></BackgroundPic>
      </Overlay>
    )
  }

